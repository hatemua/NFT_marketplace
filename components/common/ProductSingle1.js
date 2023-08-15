import OwnerList from "./OwnerList";
import Timer from './TimerTwo';
import Link from 'next/link';
import { useState } from "react";




const ProductSingle = ({data,countdown=false,style}) => {
    console.log(data)
    const [da,setDA] = useState(data);
    return (
        <>
         {da &&
        <div className="nft-item" style={style}>
            <div className="nft-inner">
                
                <div className="nft-item-top d-flex justify-content-between align-items-center">
                    
                    <div className="more-part">
                        <div className=" dropstart">
                            <a className=" dropdown-toggle" href="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false"
                                data-bs-offset="25,0">
                                <i className="icofont-flikr"></i>
                            </a>

                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#"><span>
                                    <i className="icofont-warning"></i>
                                </span> Report </a>
                                </li>
                                <li><a className="dropdown-item" href="#"><span><i
                                    className="icofont-reply"></i></span> Share</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="nft-item-bottom">
                    
                    <div className="nft-thumb">
                        <img src={`${da.image}`} alt="nft-img" />

                            
                            {countdown == true ? (<Timer data={da}/>): '' }
                            <span className="badge rounded-pill position-absolute"><i
                                className="icofont-heart"></i>
                                {`${da.wishlist}`}k</span>
                    </div>
                    <div className="nft-content">
                        <div className="content-title">
                            <h5>
                                <Link 
                                href={{
            pathname: "/itemdetails",
            query: da // the data
          }}>
                                <a>{`${da.title}`}</a> 
                                </Link>
                            </h5>
                        </div>

                        <div
                            className="nft-status d-flex flex-wrap justify-content-between align-items-center ">
                            <span className="nft-view">
                                <Link href="/activity">
                                <a><i
                                className="icofont-eye-alt"></i> View
                                History</a> 
                                </Link>
                                
                                </span>
                            <div className="nft-stock"> {`${da.stock}`} in Stock</div>
                        </div>
                        <div className="price-like d-flex justify-content-between align-items-center">
                            <div className="nft-price d-flex align-items-center">
                                <span className="currency-img">
                                    <img src='/assets/images/currency/currency-3.png'
                                        alt="currency img" />
                                </span>
                                <p>{`${da.price}`} MATIC
                                </p>
                            </div>
                            <Link            href={{
            pathname: "/itemdetails",
            query: da // the data
          }} >
                 
                            <a className="nft-bid">Place Bid</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default ProductSingle;
