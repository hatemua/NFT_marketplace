import { useState, useEffect } from 'react';
import PageHeader from '../components/PageHaeder';
import Users from '../data/User/Authors.json';
import AuthorCard from "../components/common/AuthorCard";
import NFTS from "../engine/NFTS.json"
var userList = Users.slice(0,8);

const PageHeaderText =
{
    "linkText":"Home",
    "heading":"All of our Authors"
};



const AllAuthorsTwo = () => {
    const [auth,setAuth] = useState([]);
    const _author = ()=> {
        
        const key = 'owner';
    
        const NFT = [...new Map(NFTS.map(item => [item[key], item])).values()];
        
        const arr = [];
        NFT.map((nft,k)=>
        {
            arr.push(
                {
                    "id": (k+1).toString(),
                    "name": nft.owner,
                    "address" : nft.owner,
                    "image":Users[Math.floor(Math.random() * Users.length)].image,
                    "thumbnail":Users[Math.floor(Math.random() * Users.length)].thumbnail,
                    "verified": true,
                    "prfileLink":"/",
                    "collected":"23,002.98",
                    "increament":-23.81,
                    "sales":"17900"
                }
            )
        }
        )
        console.log(arr);

        setAuth(arr);
    }
    useEffect(() => {
        _author();
      }, [])






      
    return (
        <div>
        <section className="seller-section padding-bottom padding-top">
        <div className="container">
            <section className="explore-section padding-top padding-bottom">
                <div className="container">
                <div className="section-header">
                    <div className="nft-filter d-flex flex-wrap justify-content-center">
                       
                        <div className="form-floating">
                            <select className="form-select" id="sortSelect" aria-label="Floating label select example">
                                <option>Club Collectors</option>
                               
                            </select>
                            <label > Type</label>
                        </div>
                    </div>
                    <div className="nft-search">
                        <div className="form-floating nft-search-input">
                            <input type="text" className="form-control" id="nftSearch" placeholder="Search Author" />
                            <label >Search Author</label>
                            <button type="button"> <i className="icofont-search-1"></i></button>
                        </div>
                    </div>
                </div>
                    <div className="section-wrapper">
                        <div className="explore-wrapper">
                            <div className="row justify-content-center g-4">
                                {
                                    auth.map((item) => (
                                        <AuthorCard item={item} key={item.id} address={item.address} />
                                    ))
                                }
                                
                                
                            </div>
                            

                        </div>
                    </div>
                </div>
            </section>
        </div>
    </section>
        </div>
    )
}

export default AllAuthorsTwo;