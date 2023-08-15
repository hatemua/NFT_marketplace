import { useState, useEffect } from "react";
import Router from "next/router";
import { useRouter } from "next/router";

import PageHeader from "../components/PageHaeder";
// import Products from '../data/Product/Products.json';
import CollectionSingle from "../components/common/Collection";
import copy from "copy-to-clipboard";

import PopularList from "../data/Collection/Popular.json";
import ProductSingle from "../components/common/ProductSingle";
import FollowerSingle from "../components/common/Collector";
import User from "../data/User/Users.json";
import BullscMarket from "../engine/BullscMarket.json";
import NFT from "../engine/NFT.json";
import NFTS from "../engine/NFTS.json";
import { supabase } from "../engine/Supabase";

import ActivitySingle from "../components/common/ActivitySingle";
const URLsupa =
  "https://gaiijbybqpongleztxsz.supabase.co/storage/v1/object/public/avatars/";
const Provider = "https://polygon-rpc.com/";
const privKey =
  "713b86cbd9689ccc2bd09bf4ca9030e4e3b4e484d7161b05dc45239ebdcaa0eb";

const contactAddrs = ["0x4C52548145a99EAcDe86561ef30Cd01c103cB579"];
var Follower = User.slice(0, 8);
var Following = User.slice(0, 8);

const axios = require("axios");

var GetPopularList = PopularList.slice(0, 3);

// var featuredProduct = Products.slice(0,9);

const PageHeaderText = {
  linkText: "Home",
  heading: "Author Profile",
};





const AuthorInfo = {
  name: "Tamer",
  profileImage: "/assets/images/profile/1.gif",
  cover: "/assets/images/profile/cover.jpg",
  userName: "@Tamer11",
  about:
    "Collaboratively innovate compelling mindshare after prospective partnerships Competently sereiz long-term high-impact internal or sources via user friendly strategic themesr areas creat Dramatically coordinate premium partnerships rather than standards compliant technologies ernd Dramatically matrix ethical collaboration and idea-sharing through opensource methodologies and Intrinsicly grow collaborative platforms vis-a-vis effective scenarios. Energistically strategize cost effective ideas before the worke unde.",
  country: "USA",
  specializeIn: "Art",
  wallet: "fdffx1xr394kdfdk23sl",
  age: 36,
  birthdate: "27-02-1996",
  address: "Streop Rd, Peosur, Inphodux, USA.",
  activities: [
    {
      id: 1,
      title: "Gold digger x",
      description:
        "GOLD DIGGER (x Antoni Tudisco) #44/44 was put up for sale for0.0991 ETH",
      image: "/assets/images/activity/01.gif",
      by: "@rasselmrh",
      createdAt: "10/07/2022, 10:03 am",
    },
    {
      id: 2,
      title: "ghost lix xrf",
      description: "two rare collection purchased for0.001 ETH",
      image: "/assets/images/activity/02.gif",
      by: "@technonazmul",
      createdAt: "10/07/2022, 08:23 am",
    },
    {
      id: 3,
      title: "Trust In meh",
      description: "The Shopping Cart #54/65 was put up for sale for 0.021 ETH",
      image: "/assets/images/activity/03.gif",
      by: "@reo2lxsr",
      createdAt: "10/07/2022, 12:03 am",
    },
    {
      id: 4,
      title: "Sysytan #0le",
      description:
        "A offer of $200.00 was placed for ÜNDERSTANDING (Sean Williams) #1/20",
      image: "/assets/images/activity/04.gif",
      by: "@reo2lxsr",
      createdAt: "10/07/2022, 12:03 am",
    },
  ],
};

const Author = () => {
  const router = useRouter();
  const { address } = router.query;

  const [Prods, setProds] = useState([]);
  const [image, setImages] = useState();
  const [userConnected, setUserConnected] = useState({});
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(AuthorInfo.profileImage);

  const getAvatar = async () => {
    const { data, error } = await supabase
      .from("User")
      .select("photo")
      .eq("wallet", userConnected.address);
    if (data && data.length > 0) {
      setAvatar(URLsupa + data[0].photo);
    }
  };
  const getSimpleHash = async (owner) => {
    const options = {
      headers: {
        accept: "application/json",
        "X-API-KEY":
          "bullsclub_sk_22165387-689b-4bdd-aea4-dd13179bfa51_2d5oq0c55iwiavd7",
      },
    };

    const rest = await axios.get(
      "https://api.simplehash.com/api/v0/nfts/owners?chains=polygon,bsc&wallet_addresses=" +
        owner +
        "&limit=50",
      options
    );
    console.log(rest.data);
    const simpleHashNFTs = rest.data.nfts.map((item) => {
      return {
        id: item.token_id,
        image: item.extra_metadata.image_original_url
          ? item.extra_metadata.image_original_url.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            )
          : null,
        wishlist: "0.152",
        address: item.contract_address,
        expiredate: "",
        seller: item.owners[item.owners.length - 1],
        title: item.collection.name + " " + item.token_id,
        stock: "1",
        price: 3,
        category: "Art",
        tags: "Polygone | For Sell | For Collect | Trending |  Trending_Arts",
        desc: item.description,
        owners: [
          {
            id: "1",
            name: "",
            image: "/assets/images/seller/collector-1.png",
            verified: false,
            prfileLink: "/",
          },
        ],
      };
    });
    setProds(simpleHashNFTs);
    setLoading(true);
  };

  const uploadFILE = async () => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const filename = timestamp + userConnected.address + image[0].name;
    console.log(filename);
    console.log(image[0]);

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filename, image[0], { cacheControl: "3600", upsert: false });
    console.log(data);

    const { error1 } = await supabase
      .from("User")
      .update({ photo: data.path })
      .eq("wallet", userConnected.address);
  };
  useEffect(() => {
    setUserConnected(JSON.parse(localStorage.getItem("data")));

    if (window.ethereum.selectedAddress) {
      console.log(window.ethereum.selectedAddress);
    } else {
      router.push("/wallet");
    }
    console.log(address);
    getSimpleHash(address);
    getAvatar();
  }, [loading]);





  return (
    <>
      {Prods.length > 0 && (
        <>
          <div>
            <section className="profile-section padding-top padding-bottom">
              <div className="container">
                <div className="section-wrapper">
                  <div className="member-profile">
                    <div className="profile-item">
                      <div className="profile-cover">
                        <img src={AuthorInfo.cover} alt="cover-pic" />
                        <div
                          className="edit-photo custom-upload"
                          style={{ opacity: 1 }}
                          onClick={() => uploadFILE()}
                        >
                          <div className="file-btn">
                            <i className="icofont-camera"></i>
                            Save
                          </div>
                        </div>
                      </div>
                      <div className="profile-information">
                        <div className="profile-pic">
                          <img src={avatar} alt="DP" />

                          <div className="custom-upload">
                            <>
                              {userConnected.address == address && (
                                <>
                                  <div className="file-btn">
                                    <span className="d-none d-lg-inline-block">
                                      {" "}
                                      <i className="icofont-camera"></i>
                                      Edit
                                    </span>
                                    <span className="d-lg-none mr-0">
                                      <i className="icofont-plus"></i>
                                    </span>
                                  </div>
                                  <input
                                    type="file"
                                    onChange={(ev) => {
                                      setImages(ev.target.files);
                                    }}
                                  />
                                </>
                              )}
                            </>
                          </div>
                        </div>

                        <ul className="profile-contact">
                          <li className="crypto-copy">
                            <div id="cryptoCode" className="crypto-page">
                              <input
                                id="cryptoLink"
                                value={userConnected.address}
                                readOnly
                              />
                              <div
                                id="cryptoCopy"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Copy Address"
                                onClick={() => {
                                  copy(userConnected.address);
                                  alert("text copied");
                                }}
                              >
                                <span className="copy-icon">
                                  <i
                                    className="icofont-ui-copy"
                                    aria-hidden="true"
                                    data-copytarget="#cryptoLink"
                                  ></i>
                                </span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="profile-item d-none">
                      <div className="lab-inner">
                        <div className="lab-thumb">
                          <a href="#">
                            <img
                              src="/assets/images/profile/1.gif"
                              alt="profile"
                            />
                          </a>
                        </div>
                        <div className="lab-content">
                          <div className="profile-name">
                            <div className="p-name-content">
                              <h4>TEMO</h4>
                              <p>Active 02 Minutes Ago</p>
                            </div>

                            <div className="contact-button">
                              <button className="contact-btn">
                                <i className="icofont-info-circle"></i>
                              </button>
                            </div>
                          </div>
                          <ul className="profile-contact">
                            <li>
                              <a href="#">
                                <div className="icon">
                                  <i className="icofont-user"></i>
                                </div>
                                <div className="text">
                                  <p>Add Friends</p>
                                </div>
                              </a>
                            </li>
                            {/* <li>
                                        <a href="#">
                                            <div className="icon"><i className="icofont-envelope"></i></div>
                                            <div className="text">
                                                <p>Publice Message</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div className="icon"><i className="icofont-envelope"></i></div>
                                            <div className="text">
                                                <p>Private Message</p>
                                            </div>
                                        </a>
                                    </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="profile-details">
                      <div className="tab-content" id="nav-tabContent">
                        <div
                          className="tab-pane activity-page fade show active"
                          id="allNft"
                          role="tabpanel"
                        >
                          <div>
                            <div className="row" style={{ marginTop: 100 }}>
                              <div className="col-xl-9">
                                <article>
                                  <div className="activity-tab">
                                    {/* <ul className="nav nav-pills mb-30 px-2" id="pills-tab" role="tablist">

                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link active" id="pills-mentions-tab"
                                                                data-bs-toggle="pill" data-bs-target="#pills-mentions"
                                                                type="button" role="tab" aria-controls="pills-mentions"
                                                                aria-selected="true"><i className="icofont-flash"></i>
                                                                On Sale</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="pills-favorites-tab"
                                                                data-bs-toggle="pill" data-bs-target="#pills-favorites"
                                                                type="button" role="tab" aria-controls="pills-favorites"
                                                                aria-selected="false"><i className="icofont-license"></i>
                                                                owned</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="pills-groups-tab"
                                                                data-bs-toggle="pill" data-bs-target="#pills-groups"
                                                                type="button" role="tab" aria-controls="pills-groups"
                                                                aria-selected="false"><i className="icofont-puzzle"></i>
                                                                Created</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="pills-friends-tab"
                                                                data-bs-toggle="pill" data-bs-target="#pills-friends"
                                                                type="button" role="tab" aria-controls="pills-friends"
                                                                aria-selected="false"><i className="icofont-library"></i>
                                                                Collection</button>
                                                        </li>

                                                        <li className="custom-select">
                                                            <select>
                                                                <option value="1">Everything</option>
                                                                <option value="2">Recent</option>
                                                                <option value="3">Relevant</option>
                                                                <option value="4">Popular</option>
                                                            </select>
                                                        </li>
                                                    </ul> */}
                                    <div
                                      className="tab-content activity-content"
                                      id="pills-tabContent"
                                    >
                                      <div
                                        className="tab-pane fade mentions-section show active onsale-loadmore"
                                        id="pills-mentions"
                                        role="tabpanel"
                                        aria-labelledby="pills-mentions-tab"
                                      >
                                        <div className="row justify-content-center g-4">
                                          {Prods?.map((item) => (
                                            <div
                                              className="col-lg-4 col-sm-6"
                                              key={item.id}
                                            >
                                              <ProductSingle data={item} />
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                      <div
                                        className="tab-pane fade"
                                        id="pills-favorites"
                                        role="tabpanel"
                                        aria-labelledby="pills-favorites-tab"
                                      >
                                        <div className="row justify-content-center g-4">
                                          {Prods?.map((item) => {
                                            <div
                                              className="col-lg-4 col-sm-6"
                                              key={item.id}
                                            >
                                              <ProductSingle data={item} />
                                            </div>;
                                          })}
                                        </div>
                                      </div>
                                      <div
                                        className="tab-pane fade"
                                        id="pills-friends"
                                        role="tabpanel"
                                        aria-labelledby="pills-friends-tab"
                                      >
                                        <div className="row g-4">
                                          {/*Products.map((item) => (
                                                                    
                                                                    <CollectionSingle item={item} key={item.id} />
                                                                    
                                                                ))*/}
                                        </div>
                                      </div>
                                      <div
                                        className="tab-pane fade"
                                        id="pills-groups"
                                        role="tabpanel"
                                        aria-labelledby="pills-groups-tab"
                                      >
                                        <div className="row justify-content-center g-4">
                                          {Prods?.map((item) => (
                                            <div
                                              className="col-lg-4 col-sm-6"
                                              key={item.id}
                                            >
                                              <ProductSingle data={item} />
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </article>
                              </div>

                              <div className="col-xl-3">
                                <aside className="mt-5 mt-xl-0">
                                  <div className="profile-widget search-widget">
                                    <div className="widget-inner">
                                      <div className="widget-title">
                                        <h5>Search NFT</h5>
                                      </div>
                                      <div className="widget-content">
                                        <p>
                                          Search from best Rarest NFT
                                          collections
                                        </p>
                                        <div className="form-floating nft-search-input">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search NFT"
                                          />
                                          <label>Search NFT</label>
                                          <button type="button">
                                            {" "}
                                            <i className="icofont-search-1"></i>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="widget widget-instagram">
                                    <div className="widget-header">
                                      <h5 className="title">Featured NFT</h5>
                                    </div>
                                    <ul className="widget-wrapper d-flex flex-wrap justify-content-center">
                                      {Prods?.map((item) => (
                                        <li key={item.id}>
                                          <a>
                                            <img
                                              loading="lazy"
                                              src={`${item.image}`}
                                              alt="nft-img"
                                            />
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </aside>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="about"
                          role="tabpanel"
                          aria-labelledby="nav-about-tab"
                        >
                          <div>
                            <div className="row">
                              <div className="col-xl-9">
                                <article>
                                  <div className="info-card mb-3">
                                    <div className="info-card-title">
                                      <h4>About</h4>
                                    </div>
                                    <div className="info-card-content">
                                      <p>{`${AuthorInfo.about}`}</p>
                                    </div>
                                  </div>
                                  <div className="info-card">
                                    <div className="info-card-title">
                                      <h4>Other Info</h4>
                                    </div>
                                    <div className="info-card-content">
                                      <ul className="info-list">
                                        <li>
                                          <p className="info-name">Name</p>
                                          <p className="info-details">{`${AuthorInfo.name}`}</p>
                                        </li>
                                        <li>
                                          <p className="info-name">Country</p>
                                          <p className="info-details">{`${AuthorInfo.country}`}</p>
                                        </li>
                                        <li>
                                          <p className="info-name">
                                            Specialize in
                                          </p>
                                          <p className="info-details">{`${AuthorInfo.specializeIn}`}</p>
                                        </li>
                                        <li>
                                          <p className="info-name">
                                            Wallet Add
                                          </p>
                                          <p className="info-details">{`${AuthorInfo.wallet}`}</p>
                                        </li>
                                        <li>
                                          <p className="info-name">Age</p>
                                          <p className="info-details">{`${AuthorInfo.age}`}</p>
                                        </li>
                                        <li>
                                          <p className="info-name">
                                            Date of Birth
                                          </p>
                                          <p className="info-details">{`${AuthorInfo.birthdate}`}</p>
                                        </li>
                                        <li>
                                          <p className="info-name">Address</p>
                                          <p className="info-details">{`${AuthorInfo.address}`}</p>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </article>
                              </div>

                              <div className="col-xl-3">
                                <aside className="mt-5 mt-xl-0">
                                  <div className="profile-widget search-widget">
                                    <div className="widget-inner">
                                      <div className="widget-title">
                                        <h5>Search NFT</h5>
                                      </div>
                                      <div className="widget-content">
                                        <p>
                                          Search from best Rarest NFT
                                          collections
                                        </p>
                                        <div className="form-floating nft-search-input">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search NFT"
                                          />
                                          <label>Search NFT</label>
                                          <button type="button">
                                            {" "}
                                            <i className="icofont-search-1"></i>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="widget widget-instagram">
                                    <div className="widget-header">
                                      <h5 className="title">Featured NFT</h5>
                                    </div>
                                    <ul className="widget-wrapper d-flex flex-wrap justify-content-center">
                                      {Prods?.slice(0, 9).map((item) => (
                                        <li key={item.id}>
                                          <a>
                                            <img
                                              loading="lazy"
                                              src={`${item.image}`}
                                              alt="nft-img"
                                            />
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </aside>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="activity"
                          role="tabpanel"
                          aria-labelledby="nav-activity-tab"
                        >
                          <div>
                            <div className="row">
                              <div className="col-xl-9">
                                <article>
                                  <h4 className="h4-title">Authors Activity</h4>
                                  <div className="row gy-3">
                                    {AuthorInfo.activities.map((item) => (
                                      <div className="col-12" key={item.id}>
                                        <ActivitySingle item={item} />
                                      </div>
                                    ))}
                                  </div>
                                </article>
                              </div>

                              <div className="col-xl-3">
                                <aside className="mt-5 mt-xl-0">
                                  <div className="profile-widget search-widget">
                                    <div className="widget-inner">
                                      <div className="widget-title">
                                        <h5>Search NFT</h5>
                                      </div>
                                      <div className="widget-content">
                                        <p>
                                          Search from best Rarest NFT
                                          collections
                                        </p>
                                        <div className="form-floating nft-search-input">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search NFT"
                                          />
                                          <label>Search NFT</label>
                                          <button type="button">
                                            {" "}
                                            <i className="icofont-search-1"></i>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="widget widget-instagram">
                                    <div className="widget-header">
                                      <h5 className="title">Featured NFT</h5>
                                    </div>
                                    <ul className="widget-wrapper d-flex flex-wrap justify-content-center">
                                      {Prods?.slice(0, 9).map((item) => (
                                        <li key={item.id}>
                                          <a>
                                            <img
                                              loading="lazy"
                                              src={`${item.image}`}
                                              alt="nft-img"
                                            />
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </aside>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="follower"
                          role="tabpanel"
                          aria-labelledby="nav-follower-tab"
                        >
                          <div>
                            <div className="row">
                              <div className="col-xl-9">
                                <div className="follow-wrapper">
                                  <h4 className="h4-title">All Followers</h4>
                                  <div className="row g-3">
                                    {Follower.map((item, i = 1) => (
                                      <FollowerSingle
                                        key={item.id}
                                        data={item}
                                        count={i}
                                        countShow={false}
                                        columnSize="col-lg-6"
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="col-xl-3">
                                <aside className="mt-5 mt-xl-0">
                                  <div className="profile-widget search-widget">
                                    <div className="widget-inner">
                                      <div className="widget-title">
                                        <h5>Search NFT</h5>
                                      </div>
                                      <div className="widget-content">
                                        <p>
                                          Search from best Rarest NFT
                                          collections
                                        </p>
                                        <div className="form-floating nft-search-input">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search NFT"
                                          />
                                          <label>Search NFT</label>
                                          <button type="button">
                                            {" "}
                                            <i className="icofont-search-1"></i>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="widget widget-instagram">
                                    <div className="widget-header">
                                      <h5 className="title">Featured NFT</h5>
                                    </div>
                                    <ul className="widget-wrapper d-flex flex-wrap justify-content-center">
                                      {Prods?.slice(0, 9).map((item) => (
                                        <li key={item.id}>
                                          <a>
                                            <img
                                              loading="lazy"
                                              src={`${item.image}`}
                                              alt="nft-img"
                                            />
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </aside>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="following"
                          role="tabpanel"
                          aria-labelledby="nav-following-tab"
                        >
                          <div className="row">
                            <div className="col-xl-9">
                              <div className="follow-wrapper">
                                <h4 className="h4-title">Following</h4>
                                <div className="row g-3">
                                  {Following.map((item, i = 1) => (
                                    <FollowerSingle
                                      key={item.id}
                                      data={item}
                                      count={i}
                                      countShow={false}
                                      columnSize="col-lg-6"
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-3">
                              <aside className="mt-5 mt-xl-0">
                                <div className="profile-widget search-widget">
                                  <div className="widget-inner">
                                    <div className="widget-title">
                                      <h5>Search NFT</h5>
                                    </div>
                                    <div className="widget-content">
                                      <p>
                                        Search from best Rarest NFT collections
                                      </p>
                                      <div className="form-floating nft-search-input">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Search NFT"
                                        />
                                        <label>Search NFT</label>
                                        <button type="button">
                                          {" "}
                                          <i className="icofont-search-1"></i>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="widget widget-instagram">
                                  <div className="widget-header">
                                    <h5 className="title">Featured NFT</h5>
                                  </div>
                                  <ul className="widget-wrapper d-flex flex-wrap justify-content-center">
                                    {Prods?.slice(0, 9).map((item) => (
                                      <li key={item.id}>
                                        <a>
                                          <img
                                            loading="lazy"
                                            src={`${item.image}`}
                                            alt="nft-img"
                                          />
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </aside>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Author;
