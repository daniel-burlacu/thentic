import React,{useEffect, useState,sleep} from 'react';
import Card from '../Card/Card';
import styles from './BookModal.module.css';
import Button from '../Button/Button';
import Iframe from 'react-iframe';
import {fetchCheckContracts,getContractId,fetchContract} from '../API_Calls/GET_Requests';
import {createContract,insertNewContract} from '../API_Calls/POST_Requests';

const ContractModal = (props) => {
  const[payIframe, setPayIframe] = useState("");
  const getPaymentDetails = () =>{
    return payIframe;
  }

  const randomNumberInRange=(min, max)=> {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const checkIfCreatedWithSuccess=async()=>{
    let request_id=payIframe.substring(payIframe.indexOf('=') + 1);
    console.log("My request_id="+request_id);
    await insertNewContract("","New Contract",request_id, props.wallet); 
  }

  const handleAcceptPayment =async () =>{
    let request_id=payIframe.substring(payIframe.indexOf('=') + 1);
    console.log("My request_id="+request_id);
    await insertNewContract("","New Contract",request_id, props.wallet); 
    window.open(payIframe, '_blank');
  }

//   const sleep10Sec=()=>{
//     setTimeout(() => {
//       checkIfCreatedWithSuccess();
//    },10000)
//   }

  const setIframe=async()=>{
    if(props.contractsCount===0){    

      setPayIframe(await createContract(props.userKey));
  //    sleep10Sec();
    }
  }

  useEffect(()=>{
    console.log("we are in contractModal useEffect: wallet"+props.wallet+", key="+props.userKey);
    setIframe();
  },[])




  return (
    <div>
    <div className={styles.backdrop} onClick={props.cancelModal}></div>
    <Card className={styles.modal}>
            <header className={styles.header}>
                <h2>{props.title} </h2>
            </header>
            <div className={styles.content}>
                  <p> {props.message} </p>
                {props.contractsCount===0&&<>
                  <Iframe url={getPaymentDetails()} width="450px" height="450" display="initial" position="relative"/>
                     <Button type="button" onClick={handleAcceptPayment}>Accept Transaction</Button>
                </>}
                 
                </div>
            <footer className={styles.actions}>
              <Button onClick={props.cancelModal} >Close</Button>
            </footer>
    </Card>
    </div>
  )
}

export default ContractModal;