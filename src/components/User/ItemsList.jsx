import React, { useState,useEffect } from 'react';
import {fetchNFTS,fetchChestState} from '../API_Calls/GET_Requests';
import {updateChestState,mintNFT} from '../API_Calls/POST_Requests';
import MintItems from '../MintItems/MintItems';
import ChestItem from '../MintItems/ChestItem';
import styles from './User.module.css';
import chest_styles from './Chest.module.css';
import {useDrop} from 'react-dnd';
import chestImageClosed from '../../assets/images/quest_items/chest/chest_closed.png';
import chestImageOpen from '../../assets/images/quest_items/chest/chest_open.png';
import ChestModal from '../Modal/ChestModal';

//mintNFT = async (userKey, contract,nftId,nftImgUrl, userWallet)
const ItemsList = (props) => {
  const[items, setItems] = useState([]);
  const[key, setKey] = useState('');
  const[contracts,setContracts]=useState("");
  const [board, setBoard] = useState([]);
  const [chestImage, setChestImage] = useState("");
  const [chestState, setChestState] = useState("");
  const nftImgUrl="https://behindmaskssociety.mypinata.cloud/ipfs/QmZ6S9z7DhhhUvM6SQpGJY5VYmNj8Mocwm1rhN3Ldx61Ea";
  const nftNFTUrl="ipfs//QmZ6S9z7DhhhUvM6SQpGJY5VYmNj8Mocwm1rhN3Ldx61Ea";

  let myItems = [{
    id:"",
    url:""
  }];

  let myBoard = [{
    id:"0",
    serial:"QmdsGKpdqgRz5aMLqJhX4u9Vfx63uke2Nem149MK3fhn94",
    path:chestImage
  }];

    const [{isOver}, drop] = useDrop(()=>({
    accept: "image",
    drop: (item)=>addImageToBoard(item.id, item.url),
    collect:(monitor)=>({
      isOver:!!monitor.isOver(),
    }),
  }))

  const fetchMyChestState = async()=>{
    let chState = await fetchChestState(props.wallet);
    console.log("My chest state in fetchMyChestState: "+chState);
    return chState;
  }

  const addImageToBoard = async (id__add, url__add)=>{
    var lastIndex=url__add.split("/").pop();
    //let lastIndexSerial=myBoard[0].serial;
   //lastIndexSerial=lastIndexSerial.split("/").pop()
    console.log("My NFT in addImageToBoard code is: "+lastIndex);
    
    var ser = myBoard[0].serial+'';
    var lastIndexSerial = ser.split("/").pop();
    console.log("MyBoard NFT is: "+lastIndexSerial);

 
    var myChState= await fetchMyChestState();
    console.log("My chest state in addImageToBoard is: "+myChState);

    if(lastIndexSerial===lastIndex && myChState==="closed"){
      console.log("Adding: state !!!")
      myBoard[0].url=chestImageOpen;
      setChestImage(chestImageOpen);
      await updateChestState(props.wallet, "open");
      setChestState("open");
  //    await mintNFT(props.userKey,props.contract,"203", nftImgUrl, props.userWallet )
    }
  }
  
  const getNFTS = async (userKey)=>{
    setKey(userKey);
    var nft=await fetchNFTS(userKey);
    setItems(nft);
    await polulateItemsList(nft);
  }

  const polulateItemsList=async(nft)=>{
    items.map((item, index)=>{
      console.log("My item in populateList is: "+item+", "+index);
      myItems.push({id:index, url:nft});
      return myItems;
    })
    console.log("Sending to addImageToBoard "+myItems[0].id+", "+myItems[0].url);
      addImageToBoard("0","chest");
    //  addImageToBoard("","");
  }

  const setMyChestImage=async()=>{
    var myChState= await fetchMyChestState();

    if(myChState==="open"){
      myBoard[0].path=chestImageOpen;
      setChestImage(chestImageOpen);
      setChestState("open");
    }else if(myChState==="closed"){
      setChestImage(chestImageClosed);
      setChestState("closed");
    }
  }

  useEffect(()=>{
  //  console.log("My contract in ItemsList is: "+props.contract)
    getNFTS(props.userKey);
    setMyChestImage();
    setBoard([...board,myBoard]);
  },[])

  return (
    <>
    <div  className={styles.user__container}>
      {myItems!==""&& <>{items.map((item, index)=>{
        return (<MintItems key={index} myKey={index} url={item} alt="images"/>)
      })}</>}     
    </div>
    {chestState==="closed"&&
      <div className={chest_styles.chest__container} ref={drop} >
        {board.map((item, index)=>{
          return (
          <ChestItem key={index} contract={props.contract} url={chestImage} nftUrl={nftImgUrl} id={item.id} alt="images" myChestState={chestState} wallet={props.wallet}/>)
        })}
      </div>
     
    }
    {chestState==="open"&&
    <div className={chest_styles.chest__container} ref={drop} >
      
      {board.map((item, index)=>{
        return (
        <ChestItem key={index} url={chestImage} id={item.id} alt="images" myChestState={chestState} imgUrl={nftImgUrl} wallet={props.wallet} contract={props.contract} userKey={props.userKey} />)
      })}
    </div>
   
  }
    </>
  )
}

export default ItemsList

