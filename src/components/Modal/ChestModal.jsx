import React,{useEffect, useState,sleep} from 'react';
import Card from '../Card/Card';
import styles from './BookModal.module.css';
import Button from '../Button/Button';
import Iframe from 'react-iframe';
import {mintNFT} from '../API_Calls/POST_Requests';
import {getContractIdByWallet,fetchNFTMinted,fetchChestMinted} from '../API_Calls/GET_Requests';
import {updateChestMint} from '../API_Calls/POST_Requests';

const ChestModal = (props) => {
  const[payIframe, setPayIframe] = useState("");
  const[mint, setMint] = useState(false);
  const getPaymentDetails = () =>{
    return payIframe;
  }

  const closeModal=async()=>{
    if(!props.minted){
      updateChestMint(props.wallet, "1");
      setMint(true);
      props.callbackMint(true)
      props.cancelModal();
    }else{
     props.cancelModal();
    }
  }

  // const checkIfMintedSuccess=async()=>{
  //   let serial=props.items.split("/").pop();
  //   let nftStatus = await fetchNFTMinted(props.userKey, serial);
  //   if (nftStatus==="success"){
  //     updateChestMint(props.wallet, "1");
  //     setMint(true);
  //     props.callbackMint(true)
  //   }
  // }

  const handleAcceptPayment = () =>{
    window.open(payIframe, '_blank');
  }

  // const sleep10Sec=()=>{
  //   setTimeout(() => {
  //     checkIfMintedSuccess();
  //  },10000)
  // }

  const setIframe=async()=>{
    let randomNr=randomNumberInRange(3,20);

    if(!props.minted){
      // let  contr = await getContractIdByWallet(props.wallet);
      console.log("My call in setIframe Mint is: "+props.contract+", "+randomNr+", "+props.items+", "+props.wallet);

      setPayIframe(await mintNFT(props.userKey,props.contract,randomNr,props.items, props.wallet));
  //    sleep10Sec();
      
    }
  }

  const checkChestMinted=async()=>{

    let mintedChest =await fetchChestMinted(props.wallet);
    console.log("My mintedChest is "+mintedChest);
    if(mintedChest){
      props.callbackMint();
    }
  
  }

  useEffect(()=>{
    checkChestMinted();
    if(!props.minted){
      setIframe();
    }
  },[])

  const randomNumberInRange=(min, max)=> {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return (
    <div>
    <div className={styles.backdrop} onClick={props.cancelModal}></div>
    <Card className={styles.modal}>
            <header className={styles.header}>
                <h2>{props.title} </h2>
            </header>
            <div className={styles.content}>
                  <p> {props.message} <img className={styles.img__key} src={props.items} alt='key'/></p>
                {!props.minted&&<>
                  <Iframe url={getPaymentDetails()} width="450px" height="450" display="initial" position="relative"/>
                     <Button type="button" onClick={handleAcceptPayment}>Accept Transaction</Button>
                </>}
                 
                </div>
            <footer className={styles.actions}>
              <Button onClick={closeModal} >Close</Button>
            </footer>
    </Card>
    </div>
  )
}

export default ChestModal;