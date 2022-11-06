import React,{useEffect, useState} from 'react';
import Card from '../Card/Card';
import styles from './BookModal.module.css';
import Button from '../Button/Button';
import Iframe from 'react-iframe';
import {fetchIfAnswear,fetchRiddle} from '../API_Calls/GET_Requests';
import {registerRiddleAnsweardWallet, mintNFT} from '../API_Calls/POST_Requests';

const BookModal = (props) => {
  const[answear,setAnswear] = useState(false);
  const[userKey, setUserKey] = useState("");
  const[contract,setContract] = useState("");
  const[items, setItems]=useState("");
  // const[showModal, setShowModal] = useState(0);
  const[payIframe, setPayIframe] = useState("");

  console.log("My userWallet in BookModal is: "+props.wallet);


  const addAnswearHandler=async(event)=>{
   event.preventDefault();
   let ans = event.target.answear.value;

    if(ans.includes("future")){
        setAnswear(true);
        await registerRiddleAnsweardWallet(props.wallet, 1);
        setPayIframe(await mintNFT(props.userkey,props.contract,randomNumberInRange(3,20),props.items, props.wallet));
    }
  }

  const getPaymentDetails = () =>{
    return payIframe;
  }

  const randomNumberInRange=(min, max)=> {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const checkIfAnsweard = async ()=>{    
    let answ=await fetchIfAnswear(props.wallet);
    
    if (answ>0){
      console.log("My answ in BookModal is:"+props.riddle);
      setUserKey(props.userkey);
      setContract(props.contract);
      setItems(props.items);
      setAnswear(true);
    }

  }

  const handleAcceptPayment = () =>{
    window.open(payIframe, '_blank');
  }

  useEffect(()=>{
    checkIfAnsweard();
  },[])

  return (
    <div>
      
    <div className={styles.backdrop} onClick={props.cancelModal}></div>
    <Card className={styles.modal}>
           {!answear&&<>
            <header className={styles.header}>
                <h2>{props.title} <img className={styles.img__key} src={props.items} alt='key'/></h2>
            </header>
            <div className={styles.content}>
                  <p> {props.riddle}</p>
                </div>
            <form onSubmit={addAnswearHandler}>
                <input className={styles.input} id="answear" type="text"></input>
                <Button type="submit">Check Answear</Button>
            </form>
            </>}
            {!answear&&
            <footer className={styles.actions}>

              <Button onClick={props.cancelModal} >Close</Button>
              {!answear&&<>
                <div className={styles.buy__Item}>
                  <Button onClick={props.buy} >Buy Item</Button>
                </div>
              </>
              }
            </footer>
            }
            {answear&&payIframe!==""&&<>
              <header className={styles.header}>
                <h2>You have solved the Riddle!</h2>
            </header>
            <div className={styles.content}>
                  <p>Now please accept the transaction on your metamask wallet,<br/>
                     and wait for the item to apear in the items list !</p>
                     <Iframe url={getPaymentDetails()} width="450px" height="450" display="initial" position="relative"/>
                     <Button type="button" onClick={handleAcceptPayment}>Accept Transaction</Button>
                     &nbsp;&nbsp;&nbsp;<Button onClick={props.cancelModalRefreshItems}>Close</Button>
                </div>
            </>}
            {answear&&payIframe===""&&<>
              <header className={styles.header}>
                <h2>{props.riddle}</h2>
            </header>
            <div className={styles.content}>
                  <p>If you don't see the item, Check your wallet for more details or refresh the page.</p>
            </div>
            <footer className={styles.actions}>
              <Button onClick={props.cancelModal} >Close</Button>
            </footer>
              </>}
    </Card>
    </div>
  )
}

export default BookModal