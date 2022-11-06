import React,{useEffect,useState} from 'react'
import book from '../../assets/images/quest_items/book/book.png';
import styles from './Items.module.css';
import {motion} from 'framer-motion';
import BookModal from '../Modal/BookModal';
import {fetchRiddle, fetchNFTCode, fetchIfAnswear} from '../API_Calls/GET_Requests';

let myKey=""

const Book = (props) => {
  const[modal, setModalOn] = useState(false);
  const[riddle, setRiddle] = useState("");
  const bookImageHost="https://behindmaskssociety.mypinata.cloud/ipfs/QmdsGKpdqgRz5aMLqJhX4u9Vfx63uke2Nem149MK3fhn94";
  const bookNft="ipfs//QmdsGKpdqgRz5aMLqJhX4u9Vfx63uke2Nem149MK3fhn94";
  

  const getRiddle = async ()=>{
    let answ = await fetchIfAnswear(props.wallet);
    console.log("Book answ: "+answ);
    if(answ===0){
      let riddl=await fetchRiddle(1);
      console.log("My riddle is: "+riddle);
      setRiddle(riddl);
    }else{
      return setRiddle("You already have answeard this riddle");
    }
    
  }

  const handleBookClickOn =() =>{
    console.log("MY KEY FROM BOOK IS:"+props.userKey);
        setModalOn(true);
  }

  const handleBookClickOff =() =>{
    setModalOn(false);
    setRiddle("");
    //window.location.reload(false);
  }

  const setModalOffRefreshUsers = ()=>{
    setModalOn(false);
    window.location.reload(false);
  }

  useEffect(()=>{
    getRiddle();
  },[])

  return (
    <>
      {modal&&<BookModal cancelModal={handleBookClickOff} title="To win this key, solve this riddle or buy the item !" riddle={riddle} items={bookImageHost} wallet={props.wallet} userkey={props.userKey} image={bookImageHost} contract={props.contract} refreshItems={setModalOffRefreshUsers}/>}
      <div className={styles.container__book}> 
          <motion.img  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={styles.items__book} src={book} alt="book" onClick={handleBookClickOn} />
      </div>
    </>
  )
}

export default Book;