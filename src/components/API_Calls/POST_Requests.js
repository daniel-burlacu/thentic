import axios from 'axios';

let host = "http://localhost:5432";

export const insertUser = async (acc, myKey) => {

    const insertToWallet = {
      method:'POST',
      url:host+'/api/addUser',
      data:{wallet:acc, key:myKey}
    }

    let wallet = await axios.request(insertToWallet).then(function (response) {
      return(
        response.data
      )
    }).catch(function (error) {
      console.error(error);
    });

  return wallet;
}

export const registerRiddleAnsweardWallet = async (userWallet, riddleId) => {

    const insertToWallet = {
      method:'POST',
      url:host+'/api/registerRiddleAnswearWallet',
      data:{wallet:userWallet, id:riddleId}
    }

    let myRes = await axios.request(insertToWallet).then(function (response) {
      return(
        response.data
      )
    }).catch(function (error) {
      console.error(error);
    });
    
  return myRes;
}

export const mintNFT = async (userKey, contract,nftId,nftImgUrl, userWallet) => {

  console.log("userkey= "+userKey);
  console.log("contract= "+contract);
  console.log("nftId= "+nftId);
  console.log("nftImgUrl= "+nftImgUrl);
  console.log("userWallet= "+userWallet);

  const mint = {
    method:'POST',
    url:'https://thentic.tech/api/nfts/mint',
    data:{key:userKey, 
          chain_id:'80001',
          contract:contract,
          nft_id:nftId,
          nft_data:nftImgUrl,
          to:userWallet}
  }

  let myRes = await axios.request(mint).then(function (response) {
    console.log("My nft iframe value is:"+response.data.transaction_url);
    return(
      response.data.transaction_url
    )
  }).catch(function (error) {
    console.error(error);
  });
  
return myRes;
}

export const createContract = async (userKey)=>{

  console.log("createContract userKey is:"+userKey);

  const contract={
    method:'POST',
    url:'https://thentic.tech/api/nfts/contract',
    data:{
      key:userKey, 
      chain_id:'80001',
      name:'Racer NFT',
      short_name:'RNFT'
    }
  }

  let myRes = await axios.request(contract).then(function (response) {
    console.log("My nft iframe value is:"+response.data.transaction_url);
    return(
      response.data.transaction_url
    )
  }).catch(function (error) {
    console.error(error);
  });
  
return myRes;
}

export const addChestStateItem = async (acc, state, minted) => {

  const insertToWallet = {
    method:'POST',
    url:host+'/api/addChestStateItem',
    data:{wallet:acc, state:state, minted:minted}
  }

  let wallet = await axios.request(insertToWallet).then(function (response) {
    return(
      response.data
    )
  }).catch(function (error) {
    console.error(error);
  });

return wallet;
}

export const updateChestState = async (userWallet, state) => {

  const insertToWallet = {
    method:'POST',
    url:host+'/api/updateChestState',
    data:{wallet:userWallet, state:state}
  }

  let myRes = await axios.request(insertToWallet).then(function (response) {
    return(
      response.data
    )
  }).catch(function (error) {
    console.error(error);
  });
  
return myRes;
}

export const updateChestMint = async (userWallet, minted) => {

  const update = {
    method:'POST',
    url:host+'/api/updateChestMint',
    data:{wallet:userWallet, minted:minted}
  }

  let myRes = await axios.request(update).then(function (response) {
    return(
      response.data
    )
  }).catch(function (error) {
    console.error(error);
  });
  
return myRes;
}

export const insertNewContract = async (contract_contract_id,contract_contract_name,contract_request_id, contract_created_by) => {

  const insertToWallet = {
    method:'POST',
    url:host+'/api/insertNewContract',
    data:{contract_id:contract_contract_id, name:contract_contract_name, request_id:contract_request_id,created_by:contract_created_by}
  }

  let res = await axios.request(insertToWallet).then(function (response) {
    return(
      response.data
    )
  }).catch(function (error) {
    console.error(error);
  });

return res;
}

export const updateContractIdInContracts = async (userWallet, contract_request_id) => {

  const update = {
    method:'POST',
    url:host+'/api/updateChestMint',
    data:{wallet:userWallet, request_id:contract_request_id}
  }

  let myRes = await axios.request(update).then(function (response) {
    return(
      response.data
    )
  }).catch(function (error) {
    console.error(error);
  });
  
return myRes;
}

export const updateContractIDContracts = async (contract_contract_id,contract_request_id) => {

  const update = {
    method:'POST',
    url:host+'/api/updateContractIDContracts',
    data:{contract_id:contract_contract_id, request_id:contract_request_id}
  }

  let myRes = await axios.request(update).then(function (response) {
    return(
      response.data
    )
  }).catch(function (error) {
    console.error(error);
  });
  
return myRes;
}