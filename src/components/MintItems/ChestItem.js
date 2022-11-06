import React,{useEffect, useState} from 'react';
import {useDrag} from 'react-dnd';
import styles from './ChestItem.module.css';

import {motion} from 'framer-motion';
import ChestModal from '../Modal/ChestModal';

const ChestItem=(props)=>{
    const[modal, setModalOn] = useState(false);
    const [mint , setMint] = useState(false);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: { id: props.myKey, url:props.url},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));

  const handleBookClickOn =() =>{
        setModalOn(true);
  }

  const handleBookClickOff =() =>{
    setModalOn(false);
}

const mintCallBack=async()=>{
    setMint(true);
}

// const checkNFT=(nftCode)=>{//ERROR LASTINDECOF !!!

//     if(nftCode!==undefined){
// //    var lastIndex=nftCode.split("/").pop();
//     console.log("My NFT in checkNFT code is: "+nftCode);
// }
// }

useEffect(()=>{
    console.log("My wallet in ChestItem is: "+props.wallet);
    console.log("My contract in ChestItem is: "+props.contract);
    console.log("My chestSate inside ChestItem is: "+props.myChestState+" my modal is:"+modal+" my mint:"+mint);
//    checkNFT(props.url);
    if(props.myChestState==="open"){
        handleBookClickOn();
    }
},[])
    return (
        <>
        {modal&&props.myChestState==="closed"&&<ChestModal contract={props.contract} minted="noMint"cancelModal={handleBookClickOff} wallet={props.wallet} title="Chest is Locked" message="In order to open this chest you need a key !" items={"https://behindmaskssociety.mypinata.cloud/ipfs/QmdsGKpdqgRz5aMLqJhX4u9Vfx63uke2Nem149MK3fhn94" }/>}
        {modal&&props.myChestState==="open"&&<ChestModal minted={mint} callbackMint={mintCallBack} cancelModal={handleBookClickOff} title="Chest is Unlocked" message="Refresh the page to see your item or check your wallet for details." items={props.imgUrl} wallet={props.wallet} contract={props.contract} userKey={props.userKey}/>}
        <div className={styles.container__chest}>
            <motion.img  className={styles.img__chest} ref={drag} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} src={props.url} alt="book" onClick={handleBookClickOn}/>
        </div>
        </>
        );
}
export default ChestItem;