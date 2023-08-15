import { Spacer } from "@nextui-org/react";
import SellCardList from "../data/Other/SellCard.json";

var GetSellCardList = SellCardList

const SellCard = () => {
    return(
        <div>
            <Spacer />
            <section className="process-section padding-bottom">  
        <div className="container">
        <div className="section-header justify-content-center">
                <div className="header-title">
                    <h3>Get Started Creating And Selling Your NFTs</h3>
                </div>
            </div>
            <div className="section-wrapper">
                <div className="nft-sell-wrapper">
                    <div className="row justify-content-center g-4">
                        {
                            GetSellCardList.map((item) => (
                                <div className="col-md-6" key={item.id}>
                                    <div className="nft-item style-3">
                                        <div className="nft-inner text-center">
                                            <div className="nft-thumb"> 
                                                <img /* eslint-disable-line */src={`${item.image}`} alt="nft-img" />
                                            </div>
                                            <div className="nft-content">
                                                <div className="author-details">
                                                    <h5>{`${item.title}`}</h5>
                                                    <p>{`${item.text}`}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>


                </div>
            </div>
        </div>
        <Spacer />
        <div className="section-header justify-content-center">
                        <h3>Exchange 500+ Tokens</h3>
                        <h6 className="section-header justify-content-center"> Save exchane ID if need support</h6>
                     
                       </div>
                       <div className="section-header justify-content-center">
                       <iframe id="simpleswap-frame" name="SimpleSwap Widget" width="750px" height="392px" src="https://simpleswap.io/widget/34a5646a-c181-46f8-aae5-b58476082826" frameBorder="0"></iframe></div>          
    </section>
        </div>
    )
}

export default SellCard;