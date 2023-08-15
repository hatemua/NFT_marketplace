
import Products from '../data/Product/Products.json';
import ProductSingle from "../components/common/ProductSingle1";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import BullscMarket from "../engine/BullscMarket.json";
import NFT from "../engine/NFT.json";
import axios from "axios";
import detectEthereumProvider from "@metamask/detect-provider";




const Provider = "https://polygon-rpc.com/";
const bsctrpc = "https://bsc-dataseed2.defibit.io";



const privKey =
  "713b86cbd9689ccc2bd09bf4ca9030e4e3b4e484d7161b05dc45239ebdcaa0eb";

var productList = Products.slice(0,12);




const getprods = async () => {
    var hh = "0x7a69";
    var goe = "0x5";
    var mm = "0x13881";
    var bsct = "0x61";
    const connected = await detectEthereumProvider();
    let provider;
    let web3;
    let contactAddr;
    if (connected.chainId == bsct) {
      provider = new ethers.providers.JsonRpcProvider(bsctrpc);
      web3 = new Web3(new Web3.providers.HttpProvider(bsctrpc));
      contactAddr = "0xE2A39dF45d56A436934D8EaCbcF8465E16221f6e";
    }
    contactAddr = "0x803927bCc14A38029a6Cf1149be71cc17F12B931";
    provider = new ethers.providers.JsonRpcProvider(Provider);
  
    const signer = new ethers.Wallet(privKey);
  
    const account = signer.connect(provider);
    //const gasPrice = await provider.getFeeData();
    //var gaz=ethers.utils.formatUnits(gasPrice.gasPrice, "ether")
  
    console.log("---------");
    //console.log(gaz);
    // const uniswap = new ethers.Contract('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    // ['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)external payable returns (uint[] memory amounts)']
    // ,account);
  
    const products = new ethers.Contract(contactAddr, BullscMarket, account);
    console.log("****ok*****");
    // console.log(val.c[0]);
    const tx = await products?.getAvailableNft();
    console.log(tx);
  
    return tx;
  };
  
  const getBaseUri = async (cnt, id) => {
    const provider = new ethers.providers.JsonRpcProvider(Provider);
  
    const signer = new ethers.Wallet(privKey);
  
    const account = signer.connect(provider);
    const NFTs = new ethers.Contract(cnt, NFT, account);
    console.log(cnt, id);
    const tx = await NFTs?.tokenURI(id.toString());
    console.log(tx);
  
    return tx;
  };
  
  const getMetadata = async (baseURI) => {
    let s = await axios.get(baseURI?.replace("ipfs://", "https://ipfs.io/ipfs/"));
    return s.data;
  };
  


















const ExploreTwo = () => {
    const [products, showProducts, setshowProducts] = useState([]);
    const [Prods, setProds] = useState([]);
    const [loading, setLoading] = useState(0);
    const router = useRouter();



    useEffect(() => {
        const effect = async() => {
 
       if (window.ethereum.selectedAddress)
       {
         
         console.log(window.ethereum.selectedAddress)
       }
       else
       {
         router.push("/wallet")
 
       }
 
        let x= await getprods();
        console.log(x);
        let s=[]
       const l= x.map(async(item) => {
         if(item[1] != "0x0000000000000000000000000000000000000000")
         {
         console.log(item[7].toString());
         const baseURI = await getBaseUri(item[1],item[2]);
         let r = await getMetadata (baseURI);
        
 
        const s =
         {
             id: r.name.split("#")[1],
             itemID : item[0].toString(),
             image: r.image.replace("ipfs://","https://ipfs.io/ipfs/"),
             wishlist: "0.352",
             expiredate: r.data,
             contactAddr : item[1],
             title: r.name,
             stock: "1",
             token : item[3],
             isPayble : item[4],
             seller : item[5],
             price: (Number(item[7]) / 10**18).toString() ,
             category: "Art",
             tags: "Polygone | For Sell | For Collect | Trending |  Trending_Arts",
             
            
         }
       console.log(s);
       
        return s;
       }
       
      
     })
    let filesPromise = await Promise.all(l)
    console.log(filesPromise)
   
    console.log(filesPromise)
    
    setshowProducts(filesPromise);
    setProds(filesPromise);
     }
     effect();
    
       }, [])







    const productSearch = (keyword) => {
        if (keyword != '') {
            var productListFiltered = Prods.filter((item) => {
                var productTag = item.tags.toLowerCase();
                var searchkeyword =keyword.toLowerCase();
                return productTag.includes(searchkeyword);

            });
            setshowProducts(productListFiltered);
        }else {
            setshowProducts(productList);

        }

        
        
    }



    const getProductsByCategory = (category) => {
        if (category != 'All') {
            var productListFiltered = Products.filter((item) => item.category == category);
            setshowProducts(productListFiltered);
        }else {
            setshowProducts(productList);

        }
        
    }

    



    return (
        <div>
        
        <section className="explore-section explore-page padding-top padding-bottom">
        <div className="container">

            <div className="section-wrapper">
                <div className="explore-category mb-5">
                    <div className="row g-2 justify-content-center">
                        <div className="col-xl-2 col-md-3 col-6 ">
                            <div className="excat-item active" data-filter=""><a onClick={() => getProductsByCategory("All")}><i
                                        className="icofont-cubes"></i>
                                    All</a></div>
                        </div>
                        <div className="col-xl-2 col-md-3 col-6 ">
                            <div className="excat-item" data-filter=".art"><a onClick={() => getProductsByCategory("Art")}><i
                                        className="icofont-drawing-tablet"></i> Art</a></div>
                        </div>
                        <div className="col-xl-2 col-md-3 col-6 ">
                            <div className="excat-item" data-filter=".virtual"><a onClick={() => getProductsByCategory("Virtual World")}><i
                                        className="icofont-diving-goggle"></i> Virtual World</a>
                            </div>
                        </div>
                        <div className="col-xl-2 col-md-3 col-6 ">
                            <div className="excat-item" data-filter=".trade"><a onClick={() => getProductsByCategory("Cards")} ><i
                                        className="icofont-penalty-card"></i>
                                    Cards</a>
                            </div>
                        </div>
                        <div className="col-xl-2 col-md-3 col-6 ">
                            <div className="excat-item" data-filter=".collect"><a onClick={() => getProductsByCategory("Collectibles")}><i
                                        className="icofont-cat-face"></i>
                                    Collectibles</a></div>
                        </div>
                        <div className="col-xl-2 col-md-3 col-6 ">
                            <div className="excat-item" data-filter=".sport"><a onClick={() => getProductsByCategory("Sports")}><i
                                        className="icofont-runner-alt-1"></i>
                                    Sports</a></div>
                        </div>
                    </div>
                </div>
                <div className="explore-wrapper g-4 explore-filter">
                    {
                        showProducts.map((item) => (
                            <ProductSingle data={item}  style={{ marginRight: '15px',marginBottom: '15px' }} key={item.id}/>
                        ))
                    }
                   
                    

                </div>
                
            </div>
        </div>
    </section>
        </div>
    )
}

export default ExploreTwo;