import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper';
import Link from 'next/link';

SwiperCore.use([Autoplay]);

const CollectionSingal = ({item}) => {
    return (
        <div className="col-lg-4 col-md-6">
            <div className="nft-item collection-item">
                <div className="nft-inner">
                    <div className="coll-thumb-wrapper">
                        <div className="nft-coll-thumb ">
                            <div>
                            <Swiper
                            spaceBetween={10}
                            slidesPerView={3}
                            autoplay={true}
                            
                            className="thumb-list swiper-wrapper"
                            >
                            {
                                item.products.map((product) => (
                                    <SwiperSlide key={product.id}>
                                        <div className="single-thumb"><img
                                                src={`${product.image}`}
                                                alt="cat-image" />
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                            
                            
                            </Swiper>
                                
                            </div>
                        </div>
                    </div>

                    <div className="nft-content">
                        <div className="collection-title">
                            <h5>
                                <Link href="/collectionsingle">
                                <a>{`${item.title}`}</a>
                                </Link>
                            </h5>
                            <p>Collection has {`${item.items}`} items</p>
                        </div>

                        <div
                            className="author-details d-flex flex-wrap justify-content-between align-items-center">
                            <div className="single-author d-flex align-items-center">
                                <Link href="https://bullsclub.space/bullsclub-polygon-bnb-nft-utility-vault/">
                                <a className="veryfied"><img
                                        src={`${item.users[0].image}`} alt="author-img" /></a>
                                </Link>
                                
                                <h6>
                                <Link href="https://bullsclub.space/bullsclub-polygon-bnb-nft-utility-vault/">
                                    <a>{`${item.users[0].name}`} </a>
                                </Link>
                                </h6>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollectionSingal;