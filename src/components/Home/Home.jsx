import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Book from "../Items/Book";
import Button from "../Button/Button"
import User from "../User/User";
import ContractModal from "../Modal/ContractModal";
import {
  fetchCountContracts,
  checkUser,
  createKey,
  fetchUserKey,
  getContractIdByWallet,
  getCountContractByWallet,
  fetchContract,
  getRequestIDContractsByWallet
} from "../API_Calls/GET_Requests";
import {updateContractIDContracts, insertUser,addChestStateItem} from "../API_Calls/POST_Requests";

let myKey="";

const Home = (props) => {
  const [contracts, setContracts] = useState("");
  const [contractsCount, setContractsCount] = useState(0);
  const [userKey, setUserKey] = useState("");
  const [requestId, setRequest_id] = useState("");
  const [modal, setModal] = useState(false);

  const callBackSetContracts = (contract) =>{
    setContracts(contract)
  }

  const callBakcSetRequestId = (requestid)=>{
    setRequest_id(requestId);
  }

  const checkUserKey = async () => {
    
    if ((await checkUser(props.wallet)) > 0) {
      myKey=await fetchUserKey(props.wallet);
      setUserKey(myKey);
      let countContracts=await fetchCountContracts(myKey);
      console.log("My count contracts in checkUserKey is: "+countContracts);
      if(countContracts>0){
        checkContract(myKey);
      }
      setContractsCount(await fetchCountContracts(myKey))
//      handleSetContract();
    } else {
      myKey = await createKey();
      await insertUser(props.wallet, myKey);
      setContractsCount(await fetchCountContracts(myKey))
      setUserKey(myKey);
      await addChestStateItem(props.wallet, "closed", false);
    }
  };

  const handleBookClickOn =() =>{
      setModal(true);
  }

  const handleBookClickOff =() =>{
      setModal(false);
    }

  const handleCreateContract = async () => {
    setModal(true);
    console.log("Button has been pressed! modal="+modal+" ,contracts="+contracts)
    // return (<>
    //         {modal&&<ContractModal contracts={contracts} callbackSetContract={callBackSetContracts} cancelModal={handleBookClickOff} title="Create Contract" message="In order to play this game you need to create a contract." wallet={props.wallet} userKey={userKey}/>}
    //         </>
    //        )

  };
//////////////////////
  //To be solved !!!! 
/////////////////////

  const checkContract = async (key) => {
    let contr="";
    if(contracts===""&&key!==""){
     contr = await getCountContractByWallet(props.wallet);
    }

    if(contr>0){
//      contr = await getContractIdByWallet(props.wallet);
        let my_request_id= await getRequestIDContractsByWallet(props.wallet);
        setRequest_id(my_request_id);
        let contract = await fetchContract(myKey, my_request_id);
        console.log("My contract in contr>0 is"+contract);
        setContracts(contract);
        await updateContractIDContracts(contract,my_request_id);
//      setContracts(contr);
    }

    console.log("My checkContract contract = "+contr +", userKey="+userKey);
  };

  const checkContractExists=async()=>{
    let contractCount= await checkUser(props.wallet);
    if(contractCount>0){
      myKey=await fetchUserKey(props.wallet);

    }
  }

  useEffect(() => {
    
    checkUserKey();
  }, []);

  const setUserComponent = ()=>{
    console.log("My contract in Home setUserComponent is: "+contracts)
    return <User userKey={myKey} wallet={props.wallet} contract={contracts}/>
  }

  return (
    <div className={styles.home}>
      <h1 className={styles.home__h1}>Solve the Mistery</h1>
      <p>Welcome user: {props.wallet}</p>

        {contractsCount===0&&<>
        <p>In order to play you need to create a contract ! </p>
        <Button type="button" onClick={handleBookClickOn}>Create Contract</Button><br/><br/></>}
        {modal&&<ContractModal contractsCount={contractsCount} callbackrequestid={callBakcSetRequestId} callbackSetContract={callBackSetContracts} cancelModal={handleBookClickOff} title="Create Contract" message="In order to play this game you need to create a contract." wallet={props.wallet} userKey={userKey}/>}
        {/* {contracts===""&&<Button type="button" onClick={handleSetContract}>Set Contract</Button>} */}
      {contractsCount>0&&
      <>
      <div className={styles.home__container}>
      
        <Book wallet={props.wallet} userKey={myKey} contract={contracts} callUserItems={setUserComponent}/>
       
      </div>
      {/* <User userKey={myKey}/> */}
      {setUserComponent()}
      </>
      }
      {contractsCount===0&&<div className={styles.home__container}/>}
    </div>
   
  );
};

export default Home;
