import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import Web3Modal from "web3modal";
import BullscMarket from '../engine/BullscMarket.json';
import NFTCollection from '../engine/NFT.json';
import NFT from '../engine/NFT.json';
import { useRouter } from 'next/router'

import { polyTest, ethTest, bscTest } from '../engine/chainchange';
import { Card, Button, Input, Col, Row, Spacer, Container, Text, Grid } from '@nextui-org/react';
import axios from 'axios';
import 'sf-font';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { mmnft, mmresell, mmnftcol, mmrpc } from '../engine/configuration';
import { goenft, goeresell, goenftcol, goerpc } from '../engine/configuration';
import { hhnft, hhresell, hhnftcol, hhrpc,cryptoBearNFT,CryptoCowsClub07,marketplaceAddress,bsctmarket } from '../engine/configuration';
import { bsctnft, bsctresell, bsctnftcol, bsctrpc } from '../engine/configuration';
import { cipherEth, simpleCrypto  } from '../engine/configuration';
import Select, { components } from "react-select";

export default function Sell() {
  const options = [
    { value: "-", label: "Choose", icon: "" },
    { value: "0", label: "MATIC", icon: "matic-token-icon.webp" },
    { value: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", label: "USDC", icon: "usdc.png" },
    { value: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", label: "USDT", icon: "usdt.png" },
    { value: "0x2Fa2142496B29A82899f336ebfA8481Ac1666605", label: "Messi", icon: "" },

    
  ];
  const { Option } = components;

  const [user, getUser] = useState([])
  const [chain, getChainName] = useState("")
  const [rpc, getRpc] = useState([])
  const [nftcol, getNftCol] = useState([])
  const [nftcustom, getNftCustom] = useState([])
  const [nftresell, getNftResell] = useState([])
  const [ownerAddr,setOwnerAddr] = useState("");
  const [created, getCreated] = useState([])
  const [resalePrice, updateresalePrice] = useState([])
  const [resaleToken, setResaleToke] = useState([])
  const [nfts, setNfts] = useState([])
  const [prod, setProds] = useState([])
  const [marketplaceadd, setMarketplaceadd] = useState("")
  const[Comp,setComp] = useState(0)
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [loading, setLoading] = useState(false)
  const IconOption = props => (
    <Option {...props}>
      <img
        src={'/' + props.data.icon}
        style={{ width: 36 }}
        alt={props.data.label}
      />
      {props.data.label}
    </Option>
  );
  const getMetadata = async(baseURI) => {
    let s=await axios.get(baseURI.replace("ipfs://","https://ipfs.io/ipfs/"));
    return s.data;
}
   const getSimpleHash = async(owner) =>{

    const options = {
      headers: {accept: 'application/json', 'X-API-KEY': 'bullsclub_sk_22165387-689b-4bdd-aea4-dd13179bfa51_2d5oq0c55iwiavd7'}
    };
    
    const rest= await axios.get('https://api.simplehash.com/api/v0/nfts/owners?chains=polygon,bsc&wallet_addresses='+owner+'&limit=50', options);
    console.log(rest.data.nfts);
    const simpleHashNFTs = rest.data.nfts.map((item) => {
      console.log(item);
      return{
                 id: item.token_id,
                 image: item.extra_metadata.image_original_url ? item.extra_metadata.image_original_url.replace("ipfs://","https://ipfs.io/ipfs/") : null,
                 wishlist: "0.352",
                 address:item.contract_address,
                 expiredate: "",
                 name: item.collection.name+" "+item.token_id,
                 stock: "1",
                 price: 0.1,
                 category: "Art",
                 tags: "Polygone | For Sell | For Collect | Trending |  Trending_Arts",
                 desc: item.description,
                 owners: [
                     {
                         id:"1",
                         name:"",
                         image:"assets/images/seller/collector-1.png",
                         verified: false,
                         prfileLink:"/"
                     }
                    
                 ]
                
             }
            }
    ) ;
    setProds(simpleHashNFTs);
   }
   const setMarketAdd = async() => {
    
      var bsct = "0x38";
      var poly = "0x89";
      const connected = await detectEthereumProvider();
    
      if (connected.chainId == bsct) {
        setMarketplaceadd(bsctmarket);
      }
      if(connected.chainId == poly)
      {
        setMarketplaceadd(marketplaceAddress); 

      }
   }
    useEffect(() => {


      getChain();
      setMarketAdd();
      setRpc();

      if (window.ethereum.selectedAddress)
      {
        setOwnerAddr(window.ethereum.selectedAddress);
        getSimpleHash(window.ethereum.selectedAddress);

        console.log(window.ethereum.selectedAddress)
      }
      else
      {
        router.push("/wallet")

      }

  //     const getd =async()=>{
      
  //     // const ownersNFT = NFTS.filter(o => o.owner.toLowerCase() === ownerAddr.toLowerCase())
  //     console.log(ownersNFT);
  //     let s=[];
  //     const k=ownersNFT.map(async(item) => {
  //      let r = await getMetadata(item.baseURI);
      
  //     return(
  //      {
  //          id: item.tokenID,
  //          image: r.image.replace("ipfs://","https://ipfs.io/ipfs/") ,
  //          wishlist: "0.352",
  //          address:item.addr,
  //          expiredate: "",
  //          name: r.name,
  //          stock: "1",
  //          price: 0.1,
  //          category: "Art",
  //          tags: "Polygone | For Sell | For Collect | Trending |  Trending_Arts",
  //          desc: r.description,
  //          owners: [
  //              {
  //                  id:"1",
  //                  name:"",
  //                  image:"assets/images/seller/collector-1.png",
  //                  verified: false,
  //                  prfileLink:"/"
  //              }
              
  //          ]
          
  //      }

  //     )
  //  })
  //  const x = await Promise.all(k)
  //  setProds(x);

  // }
  // getd();
  setLoading(true);
     }, [loading])
     console.log(prod)

    const router = useRouter()

    async function setRpc(){
      var hh = "0x7a69";
      var goe = "0x5";
      var mm = "0x13881";
      var bsct = "0x38";
      var poly = "0x89";
      const connected = await detectEthereumProvider();
      console.log(connected.chainId);
      if (connected.chainId == hh) {
        var mainnet = hhrpc
      }
      else if (connected.chainId == goe) {
        var mainnet = goerpc
      }
      else if (connected.chainId == mm) {
        var mainnet = mmrpc
      }
      else if (connected.chainId == bsct) {
        var mainnet = bsctrpc
      }
      if(connected.chainId == poly)
      {
        var mainnet = "https://polygon.meowrpc.com";
      }
      console.log(mainnet);

      getRpc(mainnet);
      console.log(mainnet)
      setNftCol();
    }

    async function setNftCol(){
      var hh = "0x7a69";
      var goe = "0x5";
      var mm = "0x13881";
      var bsct = "0x61";
      const connected = await detectEthereumProvider();
      if (connected.chainId == hh) {
        var nftcol = hhnftcol
      }
      else if (connected.chainId == goe) {
        var nftcol = goenftcol
      }
      else if (connected.chainId == mm) {
        var nftcol = mmnftcol
      }
      else if (connected.chainId == bsct) {
        var nftcol = bsctnftcol
      }
      getNftCol(nftcol);
      console.log(nftcol)
      setNftCustom();
    }

    async function setNftCustom(){
      var hh = "0x7a69";
      var goe = "0x5";
      var mm = "0x13881";
      var bsct = "0x38";
      var polyChain = 137;
      const connected = await detectEthereumProvider();
      console.log(connected);
      if (connected.chainId == hh) {
        var nft = hhnft
      }
      else if (connected.chainId == goe) {
        var nft = goenft
      }
      else if (connected.chainId == mm) {
        var nft = mmnft
      }
      else if (connected.chainId == bsct) {
        var nft = [cryptoBearNFT,CryptoCowsClub07];
      }
      if(connected.chainId == polyChain)
      {
        var nft = [cryptoBearNFT,CryptoCowsClub07];
      }
      getNftCustom(nft);
      console.log(nft)
      setNftResell();
    }

    async function setNftResell(){
      var hh = "0x7a69";
      var goe = "0x5";
      var mm = "0x13881";
      var bsct = "0x61";
      const connected = await detectEthereumProvider();
      if (connected.chainId == hh) {
        var nftresell = hhresell
      }
      else if (connected.chainId == goe) {
        var nftresell = goeresell
      }
      else if (connected.chainId == mm) {
        var nftresell = mmresell
      }
      else if (connected.chainId == bsct) {
        var nftresell = bsctresell
      }
      getNftResell(nftresell);
      console.log(nftresell)
    }
    const sleep = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );
    async function getChain(){
      var hh = "0x7a69";
      var goe = "0x5";
      var mm = "0x13881";
      var bsct = "0x61";
      const connected = await detectEthereumProvider();
      if (connected.chainId == hh) {
        var chainname = "HardHat"
      }
      else if (connected.chainId == goe) {
        var chainname = "Goerli Testnet"
      }
      else if (connected.chainId == mm) {
        var chainname = "Mumbai Testnet"
      }
      else if (connected.chainId == bsct) {
        var chainname = "BSC Testnet"
      }
      getChainName(chainname);
      return chainname;
    }

    async function connectUser() {
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      if (window.ethereum) {
        var web3 = new Web3(window.ethereum);
        await window.ethereum.send("eth_requestAccounts");
        var accounts = await web3.eth.getAccounts();
        var account = accounts[0];
      }
      getUser(account);
    }

    
    async function getWalletNFTs() {
      var address = window.ethereum.selectedAddress ? window.ethereum.selectedAddress : ""
      var network = rpc
      console.log(address)
      const provider = new ethers.providers.JsonRpcProvider(network)
      const key = simpleCrypto.decrypt(cipherEth)
      const wallet = new ethers.Wallet(key, provider);
      const itemArray = [];   
      for(var t = 0 ; t< nftcustom.length;t++)
      {
        console.log(nftcustom[t]);
        const contract = new ethers.Contract(nftcustom[t], NFTCollection, wallet)
        const tokens = await contract.walletOfOwner(address);
        console.log(tokens);
        for(var l = 0 ; l< tokens.length;l++)
        {
            const token = Number(tokens[l]);
            console.log(token);
            const rawUri = await contract.tokenURI(token);
            const cleanUri = rawUri.replace('ipfs://', 'https://ipfs.io/ipfs/');
            await sleep(1000);

            let value = await axios.get(cleanUri);
            let rawImg = value.data.image
              var name = value.data.name
              var desc = value.data.description
              let image = rawImg.replace('ipfs://', 'https://ipfs.io/ipfs/')

              setNfts([...nfts,{
                name: name,
                img: image,
                tokenId: token,
                wallet: address,
                desc,
                address:nftcustom[t]
              }])
             


        }
      

      }
      console.log(itemArray);

    

    }

    async function SellNFT(address,tokenID,price,Token) {
      console.log(rpc);
      const provider= new ethers.providers.JsonRpcProvider(rpc);
      var web3 = new Web3(new Web3.providers.HttpProvider(rpc));
      const val= Number(0.0125 * 1e18).toString(16);
      const pricing = Token == "0" ? (parseFloat(price)* 1e18).toString(16) : (parseFloat(price)* 10**18).toString()   ;
console.log(pricing)
      const fee = Number(0.0125 * 1e18).toString(16);
      const gazfees= await provider.getFeeData();
      console.log(gazfees.maxPriorityFeePerGas.toString())
      console.log(gazfees.maxFeePerGas.toString())

      console.log(address,tokenID.toString(),"0x"+pricing,Token == "0" ? true: false,Token == "0" ? "0x0000000000000000000000000000000000000000":Token)
const nftContract = await new web3.eth.Contract(BullscMarket, marketplaceadd);
 //set up your Ethereum transaction
  const transactionParameters = {
      to: marketplaceadd, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
  //gasLimit: web3.utils.toHex(web3.utils.toWei('50','gwei')),  
  //gasPrice: web3.utils.toHex(web3.utils.toWei('60','gwei')), 
      // maxPriorityFeePerGas: web3.utils.toHex(gazfees.maxPriorityFeePerGas.toString()),
      // maxFeePerGas: web3.utils.toHex(gazfees.maxFeePerGas.toString()),
      gas: ethers.BigNumber.from(300000).toHexString(),
      value:val,
      'data': nftContract.methods.createVaultItem(address,tokenID.toString(),"0x"+pricing,Token == "0" ? true: false,Token == "0" ? "0x0000000000000000000000000000000000000000":Token).encodeABI() //make call to NFT smart contract 
  //Web3.utils.toBN(Web3.utils.toWei(val, "ether")).toString(16)
  };
  console.log(transactionParameters)
  //sign transaction via Metamask
  try {
      const txHash = await window.ethereum.request({
              method: 'eth_sendTransaction',
              params: [transactionParameters],
          });
      // console.log(txHash);
      return {
          success: true,
          status: "✅ Check out your transaction on Etherscan: " + txHash
      }
  } catch (error) {
      return {
          success: false,
          status: "😥 Something went wrong: " + error.message
      }
  }
    }
    async function Approve(address,tokenID) {
      console.log(tokenID);
      const provider= new ethers.providers.JsonRpcProvider(rpc);
      var web3 = new Web3(new Web3.providers.HttpProvider(rpc));
   
      const gazfees= await provider.getFeeData();
      console.log(gazfees.maxPriorityFeePerGas.toString())
      console.log(gazfees.maxFeePerGas.toString())

const nftContract = await new web3.eth.Contract(NFT, address);
 //set up your Ethereum transaction
  const transactionParameters = {
      to: address, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
  //gasLimit: web3.utils.toHex(web3.utils.toWei('50','gwei')),  
  //gasPrice: web3.utils.toHex(web3.utils.toWei('60','gwei')), 
      maxPriorityFeePerGas: web3.utils.toHex(gazfees.maxPriorityFeePerGas.toString()),
      maxFeePerGas: web3.utils.toHex(gazfees.maxFeePerGas.toString()),
      gas: ethers.BigNumber.from(500000).toHexString(),
      'data': nftContract.methods.approve(marketplaceadd, tokenID).encodeABI() //make call to NFT smart contract 
  //Web3.utils.toBN(Web3.utils.toWei(val, "ether")).toString(16)
  };
  console.log(transactionParameters)
  //sign transaction via Metamask
  try {
      const txHash = await window.ethereum.request({
              method: 'eth_sendTransaction',
              params: [transactionParameters],
          });
      // console.log(txHash);
      return {
          success: true,
          status: "✅ Check out your transaction on Etherscan: " + txHash
      }
  } catch (error) {
      return {
          success: false,
          status: "😥 Something went wrong: " + error.message
      }
  }
    }

      async function getWalletNFTs1() {
        var address = window.ethereum.selectedAddress ? window.ethereum.selectedAddress : ""
        var network = rpc
        console.log(address)
        const provider = new ethers.providers.JsonRpcProvider(network)
        const key = simpleCrypto.decrypt(cipherEth)
        const wallet = new ethers.Wallet(key, provider);
        const itemArray = [];   
        for(var t = 0 ; t< nftcustom.length;t++)
        {
        const contract = new ethers.Contract(nftcustom[t], NFTCollection, wallet)

        contract.totalSupply().then(async(result) => {
          for (let i = 0; i < result; i++) {
            var token = i + 1                         
            const owner = await contract.ownerOf(token);
             
              if(owner.toLowerCase() == address.toLowerCase())
              {
                console.log("ok");
            const rawUri = await contract.tokenURI(token);

            const Uri = Promise.resolve(rawUri)
            const getUri = Uri.then(value => {
              var cleanUri = value.replace('ipfs://', 'https://ipfs.io/ipfs/')
              let metadata = axios.get(cleanUri).catch(function (error) {
                console.log(error.toJSON());
              });
              return metadata;
            })
            getUri.then(value => {
              let rawImg = value.data.image
              var name = value.data.name
              var desc = value.data.description
              let image = rawImg.replace('ipfs://', 'https://ipfs.io/ipfs/')
              Promise.resolve(owner).then(value => {
                let ownerW = value;
                let meta = {
                  name: name,
                  img: image,
                  tokenId: token,
                  wallet: ownerW,
                  desc,
                }
                console.log(meta)
                itemArray.push(meta)
              })
            })
          }
          }
        })
        }
        await new Promise(r => setTimeout(r, 2000));
        setNfts(itemArray)
        setLoadingState('loaded');
      }


      async function getCreatedNFTs() {
        var address = nftcustom
        var network = rpc
        const provider = new ethers.providers.JsonRpcProvider(network)
        const key = simpleCrypto.decrypt(cipherEth)
        const wallet = new ethers.Wallet(key, provider);
        const contract = new ethers.Contract(address, NFT, wallet)
        const itemArray = [];
        contract._tokenIds().then(result => {
          for (let i = 0; i < result; i++) {
            var token = i + 1                         
            const owner = contract.ownerOf(token).catch(function (error) {
                console.log("tokens filtered");
              });
            const rawUri = contract.tokenURI(token).catch(function (error) {
                console.log("tokens filtered");
              });
            const Uri = Promise.resolve(rawUri)
            const getUri = Uri.then(value => {
              var cleanUri = value.replace('ipfs://', 'https://ipfs.io/ipfs/')
              let metadata = axios.get(cleanUri).catch(function (error) {
                console.log(error.toJSON());
              });
              return metadata;
            })
            getUri.then(value => {
              let rawImg = value.data.image
              var name = value.data.name
              var desc = value.data.description
              let image = rawImg.replace('ipfs://', 'https://ipfs.io/ipfs/')
              Promise.resolve(owner).then(value => {
                let ownerW = value;
                let meta = {
                  name: name,
                  img: image,
                  tokenId: token,
                  wallet: ownerW,
                  desc,
                }
                console.log(meta)
                itemArray.push(meta)
              })
            })
          }
        })
        await new Promise(r => setTimeout(r, 2000));
        getCreated(itemArray)
        setLoadingState('loaded');
      }

      async function refreshNFTs(){
        setRpc();
        getWalletNFTs();
        getChain();
      }

      async function connectWallet(){
        connectUser();
        setRpc();
        getChain();
      }



      if (loadingState  && !prod.length) 
      return (
        <Container >
      <Row >
        <Col>
      <Text h3>No NFTs Found, Connect Wallet</Text>
      <Button
          size="sm"
          color="gradient"
          onPress={refreshNFTs}
          style={{ fontSize: "20px" }}
        >
          Refresh
        </Button>
      </Col>
      </Row>
      <Spacer></Spacer>
      </Container>
)
if (loading   && prod.length) 
return (
    <div>
    <Container md>
    <Row>
        <Col css={{ size: "$50", paddingLeft: "$10", paddingTop: "$4" }}>
          <Card css={{ p: "$9", backgroundColor: "$blue200" }}>
          <Row>
          <Text h4 css={{marginRight:'$3'}}>
              Switch Blockchain
            </Text>
          <Button size="sm" onPress={polyTest} css={{ marginRight: "$2" }}>
                <img src="polygonwhite.png" width={"100px"} />
              </Button>
              <Button size="sm" onPress={bscTest} css={{ marginRight: "$2" }}>
                <img src="bsc.png" width={"100px"} />
              </Button>
              <Button size="sm" onPress={ethTest}>
                <img src="ethereumlogo.png" width={"100px"} />
              </Button>
              </Row>
              <Card css={{ p: "$4", marginTop:'$3'}}>
            <Text h3>
              Wallet
              <Text h5 css={{ color: "#39FF14" }}>
                {user}
              </Text>
            </Text>
            <Text h6>Selected Chain: {chain}</Text>
            <Row>
            <Button
                size="sm"
                color="gradient"
                onPress={connectWallet}
                style={{ fontSize: "20px", marginRight:'4px' }}
              >
               Connect
              </Button>
              <Button
                size="sm"
                color="gradient"
                onPress={refreshNFTs}
                style={{ fontSize: "20px" }}
              >
                Refresh
              </Button>
            </Row>
            </Card>
          </Card>
        </Col>
      </Row>
      <Row>
        <Grid.Container gap={3}>
          {prod.map((nft, i) => {
           
              return (
                <Grid key={i}>
                  <a>
                    <Card
                      isHoverable
                      key={i}
                      css={{ mw: "200px", marginRight: "$1" }}
                      variant="bordered"
                    >
                      <Card.Image src={nft.image} />
                      <Card.Body  key={i}>
                        <h3
                          style={{
                            color: "#9D00FF",
                            fontFamily: "SF Pro Display",
                          }}
                        >
                          Owned by You
                        </h3>
                        <Text h5>
                          {nft.name} Token-{nft.id}
                        </Text>
                        <Text>{nft.desc}</Text>
                        <Input
                          size="sm"
                          css={{
                            marginTop: "$2",
                            maxWidth: "120px",
                            marginBottom: "$2",
                            border: "$blue500",
                          }}
                          style={{
                            color: "white",
                            fontFamily: "SF Pro Display",
                            fontWeight: "bolder",
                            fontSize: "15px",
                          }}
                          placeholder="Set your price"
                          value={resalePrice[i]}
                          onChange={(e) => {
                            let s = resalePrice
                            s[i] = e.target.value
                            
                            updateresalePrice(s);
                          }
                          }
                        />
                         <Select
                         styles={{zIndex:10000}}
        defaultValue={options[0]}
        options={options}
        components={{ Option: IconOption }}
        onChange={(e) => {
          let s = resaleToken
          s[i] = e.value
          setResaleToke(s)
        }
        }
      />
      
      <Button
                          size="sm"
                          color="gradient"
                          style={{ fontSize: "20px" }}
                          onClick = {()=>{console.log(resalePrice[i]),Approve(nft.address,nft.id)}}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          color="gradient"
                          style={{ fontSize: "20px" }}
                          onClick = {()=>{console.log(resalePrice[i]),SellNFT(nft.address,nft.id,resalePrice[i],resaleToken[i])}}
                        >

                          Relist for Sale
                        </Button>
                      </Card.Body>
                    </Card>
                  </a>
                </Grid>
              );
            
          })}
        </Grid.Container>
      </Row>
    </Container>
    <Spacer></Spacer>
 
  </div>
)
}
