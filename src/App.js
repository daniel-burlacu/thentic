import React,{useState, useEffect} from 'react';
import Home from './components/Home/Home';
// import User from './components/User/User';
import {ethers} from "ethers";
import './App.css';
import {checkUser,fetchUserKey,createKey} from './components/API_Calls/GET_Requests';
import {insertUser} from './components/API_Calls/POST_Requests';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [account, setAccount] = useState("");
  const [key, setKey] = useState("")



//   const insertUser = async (acc, myKey) => {

//     const insertToWallet = {
//       method:'POST',
//       url:'http://localhost:5432/api/addUser',
//       data:{wallet:acc, key:myKey}
//     }

//     let wallet = await axios.request(insertToWallet).then(function (response) {
//       return(
//         response.data
//       )
//     }).catch(function (error) {
//       console.error(error);
//     });
//   return wallet;
// }

  //   const checkUser = async (acc) => {

  //     const checkWallet = {
  //       method: 'GET',
  //       url: 'http://localhost:5432/api/userExists',
  //       params: {wallet: acc},
  //     };

  //     let wallet = await axios.request(checkWallet).then(function (response) {
  //       return(
  //         response.data
  //       )
  //     }).catch(function (error) {
  //       console.error(error);
  //     });
  //   return wallet;
  // }

//   const fetchUserKey = async (acc) => {

//     const getUserKeyConfig = {
//       method: 'GET',
//       url: 'http://localhost:5432/api/getKeyWallet',
//       params: {wallet: acc},
//     };

//     let userKey = await axios.request(getUserKeyConfig).then(function (response) {
//       return(
//         response.data
//       )
//     }).catch(function (error) {
//       console.error(error);
//     });

// //    setKey(userKey)
//     console.log("My userkey in fetchuserkey is:"+userKey);
//     return userKey;
//   }

// /  {key&&<User userKey={key} />}
//   const createKey = async () => {

//     const getCreateUserKey = {
//       method: 'GET',
//       url: 'https://thentic.tech/api/key'
//     };

//     let keyVal = await axios.request(getCreateUserKey).then(function (response) {
//       console.log("My key in createKey is: "+ response.data);
//       return(
//         response.data
//       )
//     }).catch(function (error) {
//       console.error(error);
//     });
// //    setKey(keyVal);
//     return keyVal;
//   }

  const checkConnection = async() =>{
    if(typeof window.ethereum !== "undefined"){
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if(accounts[0]!==undefined){
        
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const newSigner = provider.getSigner();

          let chainId = await newSigner.getChainId();
          if(chainId!==80001){
            alert("You are not connected the Correct network please switch to: chainID:8001 RPC URL:https://matic-mumbai.chainstacklabs.com");
          }else{
           setAccount(accounts[0]);
          }
        }else{
          window.location.reload(false);
        }
  }else{
    alert("Metamask not installed !!! Please install metamask in order to place a mint or do a withdrawal !!!");
  }

}

useEffect(()=>{
  checkConnection();
},[])

  return (
    <>
    {account === "" &&(
      <div className="app__container">
        <h1 className="app__h1">Please connect to metamaks in order to play this game !</h1>
      </div>
    )}
    {account !== ""&&(
    <div className="app__container">
      <Home wallet={account}/>
    </div>
    )}
    {/* {key!==""&&(
      <User userKey={key}/>
    )} */}
  </>
  );
    }
  

export default App;
