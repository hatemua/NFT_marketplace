import Link from "next/link";

const News = ({ data }) => {
  return (
    <div className="col-lg-4 col-sm-6">
      <div className="nft-item blog-item">
        <div className="nft-inner">
          <div className="nft-thumb">
            <Link
              href="https://unstoppabledomains.com/?ref=e904125842e0429"
              target="blank"
            >
              <img src={`${data.image}`} alt="blog-img" />
            </Link>
          </div>
          <div className="nft-content">
            <div className="author-details">
              <h4>
                <Link href="https://ipfs.io/ipfs/QmbeW8LBF38QBSJjVGrUMA5znASZKHfX3QvgzvTJenvFUC/">
                  <a>{`${data.title}`}</a>
                </Link>
              </h4>
              <div className="meta-info"></div>
              <Link href={`${data.link}`}>
                <a className="default-btn move-right small-btn">
                  <span>SHOP NOW</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
