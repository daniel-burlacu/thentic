import axios from 'axios';

const host="http://localhost:5432";

export const checkUser = async (acc) => {

    const checkWallet = {
      method: 'GET',
      url: host+'/api/userExists',
      params: {wallet: acc},
    };

    let wallet = await axios.request(checkWallet).then(function (response) {
      return(
        response.data
      )
    }).catch(function (error) {
      console.error(error);
    });
  return wallet;
}

export const fetchUserKey = async (acc) => {

    const getUserKeyConfig = {
      method: 'GET',
      url: host+'/api/getKeyWallet',
      params: {wallet: acc},
    };

    let userKey = await axios.request(getUserKeyConfig).then(function (response) {
      return(
        response.data
      )
    }).catch(function (error) {
      console.error(error);
    });
    console.log("My userkey in fetchuserkey is:"+userKey);
    return userKey;
  }

  export const fetchRiddleAnswear = async (id) => {
    const getUserKeyConfig = {
      method: 'GET',
      url: host+'/api/getAnswear',
      params: {id: id},
    };

    let answear = await axios.request(getUserKeyConfig).then(function (response) {
      return(
        response.data
      )
    }).catch(function (error) {
      console.error(error);
    });
    console.log("My userkey in fetchuserkey is:"+answear);
    return answear;
  }

  export const fetchRiddle = async (id) => {
    const getUserKeyConfig = {
      method: 'GET',
      url: host+'/api/getRiddle',
      params: {id: id},
    };

    let riddle = await axios.request(getUserKeyConfig).then(function (response) {
      return(
        response.data
      )
    }).catch(function (error) {
      console.error(error);
    });
    console.log("My riddle in fetchRiddle is:"+riddle);
    return riddle;
  }

  export const fetchNFTCode = async (id) => {
    const getUserKeyConfig = {
      method: 'GET',
      url: host+'/api/getNFTCode',
      params: {id: id},
    };

    let nftCode = await axios.request(getUserKeyConfig).then(function (response) {
      return(
        response.data
      )
    }).catch(function (error) {
      console.error(error);
    });
    console.log("My userkey in fetchuserkey is:"+nftCode);
    return nftCode;
  }

  export const fetchIfAnswear = async (wallet) => {
    const getUserKeyConfig = {
      method: 'GET',
      url: host+'/api/getRiddleWallet',
      params: {wallet: wallet},
    };

    let answeard = await axios.request(getUserKeyConfig).then(function (response) {
      return(
        response.data
      )
    }).catch(function (error) {
      console.error(error);
    });

    return answeard;
  }  

export const createKey = async () => {

    const getCreateUserKey = {
      method: 'GET',
      url: 'https://thentic.tech/api/key'
    };

    let keyVal = await axios.request(getCreateUserKey).then(function (response) {
      console.log("My key in createKey is: "+ response.data);
      return(
        response.data
      )
    }).catch(function (error) {
      console.error(error);
    });
//    setKey(keyVal);
    return keyVal;
  }

export const fetchNFTS = async (userKey) => {
    let arrNFT=[];
    const options = {
      method: 'GET',
      url: 'https://thentic.tech/api/nfts',
      params: {key: userKey, chain_id: '80001'},
    };

    const res = await axios.request(options).then(function (response) {
      let dt=response.data;
    
      console.log("my url link is:"+dt.nfts);

      dt.nfts.map((url)=>{
        if(url.status==="success"){
            arrNFT.push(url.data);
        }
        return(url.data);
    })
    //  console.log("My dt is: "+dt.nfts[0].data);
      console.log("I am returning: "+arrNFT);

    }).catch(function (error) {
      console.error(error);
    });

    return(
        arrNFT
       )
  }

  
  export const fetchNFTMinted = async (userKey, nftId) => {
    let arrNFT="pending";

    const options = {
      method: 'GET',
      url: 'https://thentic.tech/api/nfts',
      params: {key: userKey, chain_id: '80001'},
    };

    const res = await axios.request(options).then(function (response) {
      let dt=response.data;
    
      console.log("my url link is:"+dt.nfts);

      dt.nfts.map((nft)=>{
        var id = nft.data.split("/").pop()
        console.log("My nftID= "+id);
        if(nft.status==="success"&&id===nftId){
            arrNFT="success";
        }
        return(nft.data);
    })
    //  console.log("My dt is: "+dt.nfts[0].data);
      console.log("I am returning: "+arrNFT);

    }).catch(function (error) {
      console.error(error);
    });

  return(
      arrNFT
     )
}

  export const getContractId = async (contract_request_id ) => {
    let contract="";
    const options = {
      method: 'GET',
      url: host+'/api/getContractId',
      params: {request_id:contract_request_id},
    };

    const res = await axios.request(options).then(function (response) {
      let dt=response.data;
      contract=dt;
      console.log("my url link is:"+dt);

    //  console.log("My dt is: "+dt.nfts[0].data);

    }).catch(function (error) {
      console.error(error);
    });

    return(
      contract
       )
  }

  export const getContractIdByWallet = async (contract_wallet) => {
    let contract="";
    const options = {
      method: 'GET',
      url: host+'/api/getContractByWallet',
      params: {wallet:contract_wallet},
    };

    const res = await axios.request(options).then(function (response) {
      let dt=response.data;
      contract=dt;
      console.log("my wallet in getContractIdByWallet is:"+dt);

    //  console.log("My dt is: "+dt.nfts[0].data);

    }).catch(function (error) {
      console.error(error);
    });

    return(
      contract
       )
  }

  export const getCountContractByWallet = async (contract_wallet) => {
    let contract="";
    const options = {
      method: 'GET',
      url: host+'/api/getCountContractByWallet',
      params: {wallet:contract_wallet},
    };

    const res = await axios.request(options).then(function (response) {
      let dt=response.data;
      contract=dt;
      console.log("my wallet in getContractIdByWallet is:"+dt);

    //  console.log("My dt is: "+dt.nfts[0].data);

    }).catch(function (error) {
      console.error(error);
    });

    return(
      contract
       )
  }

  //
  export const getRequestIDContractsByWallet = async (contract_wallet) => {
    let contract="";
    const options = {
      method: 'GET',
      url: host+'/api/getRequestIDContractsByWallet',
      params: {wallet:contract_wallet},
    };

    const res = await axios.request(options).then(function (response) {
      let dt=response.data;
      contract=dt;
      console.log("my wallet in getContractIdByWallet is:"+dt);

    //  console.log("My dt is: "+dt.nfts[0].data);

    }).catch(function (error) {
      console.error(error);
    });

    return(
      contract
       )
  }
  export const fetchContractsWithId = async (userKey, requestId) => {

    console.log("My userKey is:"+userKey)

    let myCtr="";

    const options = {
      method: 'GET',
      url: 'https://thentic.tech/api/contracts',
      params: {key: userKey, chain_id: '80001'},
    };

    const res = await axios.request(options).then(function (response) {
     let data=response.data; 
    //  console.log("My dt is: "+dt.nfts[0].data);
    data.contracts.map(dt=>{
      console.log("contractLink includes: "+requestId);
      if(dt.request_id===requestId&&dt.status==="success"){
        console.log("my data.contract :"+dt.contract);
        myCtr=dt.contract;
        return dt.contrat;
      }
    })
    // if(dt.contracts[0].lenght!==0){
    //   console.log("I am returning: "+dt.contracts[0].contract);
      
    //   myData.status.push(dt.contracts[0].status);
    // }else{
    //   dt="";
    // }
    }).catch(function (error) {
      console.error(error);
    });

    return(
      myCtr
       )
  }

  export const fetchCheckContracts = async (userKey, requestId) => {

    console.log("My userKey is:"+userKey)

    let myCtr="";

    const options = {
      method: 'GET',
      url: 'https://thentic.tech/api/contracts',
      params: {key: userKey, chain_id: '80001'},
    };

    const res = await axios.request(options).then(function (response) {
     let data=response.data; 
    //  console.log("My dt is: "+dt.nfts[0].data);
    data.contracts.map(dt=>{
      console.log("contractLink includes: "+requestId);
      if(dt.request_id===requestId&&dt.status==="success"){
        console.log("my data.contract :"+dt.contract);
        myCtr=dt.status;
        return dt.status;
      }
    })
    // if(dt.contracts[0].lenght!==0){
    //   console.log("I am returning: "+dt.contracts[0].contract);
      
    //   myData.status.push(dt.contracts[0].status);
    // }else{
    //   dt="";
    // }
    }).catch(function (error) {
      console.error(error);
    });

    return(
      myCtr
       )
  }

  export const fetchContract = async (userKey, requestId) => {

    console.log("My userKey is:"+userKey)

    let myCtr="";

    const options = {
      method: 'GET',
      url: 'https://thentic.tech/api/contracts',
      params: {key: userKey, chain_id: '80001'},
    };

    const res = await axios.request(options).then(function (response) {
     let data=response.data; 
    //  console.log("My dt is: "+dt.nfts[0].data);
    data.contracts.map(dt=>{
      console.log("contractLink includes: "+requestId);
      if(dt.request_id===requestId&&dt.status==="success"){
        console.log("my data.contract :"+dt.contract);
        myCtr=dt.contract;
        return dt.status;
      }
    })
    // if(dt.contracts[0].lenght!==0){
    //   console.log("I am returning: "+dt.contracts[0].contract);
      
    //   myData.status.push(dt.contracts[0].status);
    // }else{
    //   dt="";
    // }
    }).catch(function (error) {
      console.error(error);
    });

    return(
      myCtr
       )
  }

  export const fetchCountContracts = async(userKey)=>{
    let countContracts=0;

    const options = {
      method: 'GET',
      url: 'https://thentic.tech/api/contracts',
      params: {key: userKey, chain_id: '80001'},
    };

    const res = await axios.request(options).then(function (response) {
      let dt=response.data;    

    //  console.log("My dt is: "+dt.nfts[0].data);
    dt.contracts.map(data=>{
      if(data.status==="success"){
        countContracts++;
      }
    })
    }).catch(function (error) {
      console.error(error);
    });

    return countContracts;
  }

  export const fetchChestState = async (wallet) => {
    const getUserKeyConfig = {
      method: 'GET',
      url: host+'/api/getChestState',
      params: {wallet: wallet},
    };

    let state = await axios.request(getUserKeyConfig).then(function (response) {
      return(
        response.data
      )
    }).catch(function (error) {
      console.error(error);
    });
    console.log("My state in fetchChestState is:"+state);
    return state;
  }

  export const fetchChestMinted = async (wallet) => {
    const getUserKeyConfig = {
      method: 'GET',
      url: host+'/api/getChestMinted',
      params: {wallet: wallet},
    };

    let minted = await axios.request(getUserKeyConfig).then(function (response) {
      console.log("My fetchChestMinted data response is: "+response.data);
      return(
        response.data
      )
    }).catch(function (error) {
      console.error(error);
    });
    console.log("My minted in fetchChestState is:"+minted);
    return minted;
  }

  export const getHigherContractsID = async () => {
    const getUserKeyConfig = {
      method: 'GET',
      url: host+'/api/getHigherContractsID',
    };

    let nr = await axios.request(getUserKeyConfig).then(function (response) {
      return(
        response.data
      )
    }).catch(function (error) {
      console.error(error);
    });
    console.log("My nr in getHigherContractsID is:"+nr.id);
    return nr.id;
  }