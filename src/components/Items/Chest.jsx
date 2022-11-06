import React,{useState} from 'react';
import styles from './Items.module.css';
import {motion} from 'framer-motion';
import chest from '../../assets/images/quest_items/chest/chest_closed.png';
import ChestModal from '../Modal/ChestModal';

const Chest = () => {
  const[modal, setModalOn] = useState(false);

  const handleBookClickOn =() =>{
        setModalOn(true);
  }

  const handleBookClickOff =() =>{
    setModalOn(false);
}
  return (
    <>
      {modal&&<ChestModal cancelModal={handleBookClickOff} title="Chest is Locked" message="In order to open this chest you need a key !" items={"https://behindmaskssociety.mypinata.cloud/ipfs/QmdsGKpdqgRz5aMLqJhX4u9Vfx63uke2Nem149MK3fhn94"}/>}
      <div className={styles.container__chest}>
          <motion.img  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={styles.items__chest} src={chest} alt="book" onClick={handleBookClickOn}/>
      </div>
    </>
  )
}

export default Chest;