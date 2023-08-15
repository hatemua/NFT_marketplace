import Products from '../data/Product/Trending.json';
import ProductSingle from "./common/ProductSingle";

var productList = Products;

const TrendingNow = () => {
    return(
        <div>
            <section className="artwork-section">
            <div className="container">
                <div className="section-header">
                    <h3 className="header-title">Live Now</h3>
                    <div className="header-content">
                        <ul className="filter-group d-flex flex-wrap align-items-center">
                            <li className="li collection-filter">
                                <div className="select-wrapper arrow-blue" data-icon="&#xef29;">
                                    <select className="form-select " aria-label="Collection select">
                                        <option>Recently Added</option>
                                       
                                    </select>
                                </div>
                            </li>
                            
                            
                            
                        </ul>
                    </div>
                </div>
                <div className="section-wrapper">
                    <div className="row justify-content-center g-4">
                        {
                            productList.map((item) => (
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-9" key={item.id}>
                                    <ProductSingle data={item} />
                                </div>
                            ))
                        }
                        
                        
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}

export default TrendingNow;