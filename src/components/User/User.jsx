import React, { useState,useEffect } from 'react';
import { DndProvider } from "react-dnd";
import ItemsList from './ItemsList';
import { HTML5Backend } from "react-dnd-html5-backend";

 
const User = (props) => {

 const getItemsList=()=>{
  console.log("My contract in User is: "+props.contract);
  return(
    <ItemsList userKey={props.userKey} wallet={props.wallet} contract={props.contract}/>
  )
 } 

  return (
  <DndProvider backend={HTML5Backend}>
    {getItemsList()}
  </DndProvider>

  )
}

export default User