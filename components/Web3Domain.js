import News from "./common/News";
import NewsList from "../data/Domains/Domains.json";
import Link from "next/link";

var LatestNewsList = NewsList.slice(0, 3);

const Web3Domain = () => {
  return (
    <div>
      <section className="blog-section pb-120">
        <div className="container">
          <div className="section-header">
            <h3 className="header-title"> WEB3 Domains</h3>
            <h3 className="header-title"> Own your Domain forever</h3>
            <div className="header-content"></div>
          </div>

          <div className="section-wrapper">
            <div className="blog-wrapper">
              <div className="row justify-content-center g-4">
                {LatestNewsList.map((item) => (
                  <News data={item} key={item.id} Link={item.link} />
                ))}
              </div>
            </div>
            <div className="text-center mt-5">
              <Link
                href="https://ipfs.io/ipfs/QmbeW8LBF38QBSJjVGrUMA5znASZKHfX3QvgzvTJenvFUC/"
                target="blank"
              >
                <a className="default-btn move-right">
                  <span>BUILD YOUR W3BSITE</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Web3Domain;
