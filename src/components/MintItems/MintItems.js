import { mnemonicToEntropy } from 'ethers/lib/utils';
import React from 'react';
import {useDrag} from 'react-dnd';
import styles from '../User/ItemsList.module.css';


function NFT(props){
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: { id: props.myKey, url:props.url},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));
    return (
        <img
      ref={drag}
      src={props.url}
      width="50px"
      style={{ border: isDragging ? "5px solid pink" : "0px" }}
      alt="myimg"
    />
    );
}

export default NFT;