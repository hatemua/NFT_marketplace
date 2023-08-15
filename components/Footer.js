import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  return (
    <div>
      <footer className="footer-section">
        <div
          className="footer-top"
          style={{ backgroundImage: "url('assets/images/footer/bg.jpg')" }}
        >
          <div className="footer-newsletter">
            <div className="container">
              <div className="row g-4 align-items-center justify-content-center">
                <div className="col-lg-6">
                  <div className="social-part ps-lg-5">
                    <div className="ft-header">
                      <h4>Join the Community</h4>
                    </div>
                    <ul className="social-list d-flex flex-wrap align-items-center mb-0">
                      <li className="social-link">
                        <a
                          href="https://twitter.com/BULLSClub11"
                          target="blank"
                        >
                          <i className="icofont-twitter"></i>
                        </a>
                      </li>
                      <li className="social-link">
                        <a
                          href="https://www.facebook.com/bullsclub.space"
                          target="blank"
                        >
                          <i className="icofont-facebook"></i>
                        </a>
                      </li>
                      <li className="social-link">
                        <a
                          href="https://www.linkedin.com/company/bullsclub/"
                          target="blank"
                        >
                          <i className="icofont-linkedin"></i>
                        </a>
                      </li>
                      <li className="social-link">
                        <a
                          href="https://www.instagram.com/bullsclub11/"
                          target="blank"
                        >
                          <i className="icofont-instagram"></i>
                        </a>
                      </li>
                      <li className="social-link">
                        <a
                          href="https://www.youtube.com/channel/UC0B86iP_JiBexQYxTtRxcnA"
                          target="blank"
                        >
                          <i className="icofont-youtube"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-links padding-top padding-bottom">
            <div className="container">
              <div className="row g-5">
                <div className="col-lg-3 col-md-6">
                  <div className="footer-link-item">
                    <h4>About</h4>
                    <ul className="footer-link-list">
                      <li>
                        <a
                          href="https://bullsclub.space/"
                          target="blank"
                          className="footer-link"
                        >
                          Explore
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://game.bullsclub.space/"
                          target="blank"
                          className="footer-link"
                        >
                          Game
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://bullsverse.bullsclub.space/"
                          target="blank"
                          className="footer-link"
                        >
                          Bullsverse
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://tokenomics.bullsclub.space/"
                          className="footer-link"
                        >
                          Token
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://radio.bullsclub.space/"
                          className="footer-link"
                        >
                          Radio
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="footer-link-item">
                    <h4>Company</h4>
                    <ul className="footer-link-list">
                      <li>
                        <a
                          href="https://bullsclub.space/cryptobullsclub-space-team/"
                          className="footer-link"
                        >
                          Team
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://roadmap.bullsclub.space/"
                          className="footer-link"
                        >
                          Roadmap
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://bullsclub.space/bullsclub-space/faq/whitepaper/"
                          className="footer-link"
                        >
                          White Paper
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://bullsclub.space/crypto-blog/"
                          className="footer-link"
                        >
                          WEB3 Blog
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://travel-blog.bullsclub.space/"
                          target="blank"
                          className="footer-link"
                        >
                          Travel Blog
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="footer-link-item">
                    <h4>Policy</h4>
                    <ul className="footer-link-list">
                      <li>
                        <Link href="/terms">
                          <a className="footer-link">Terms</a>
                        </Link>{" "}
                      </li>
                      <li>
                        <a
                          href="https://bullsclub.space/bullsclub-space/faq/privacy-policy/"
                          className="footer-link"
                        >
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <Link href="/help">
                          <a className="footer-link">FAQ </a>
                        </Link>
                      </li>
                      <li>
                        <a
                          href="https://bullsclub.space/bullsclub-space/faq/bullsc-nft-agreement/"
                          className="footer-link"
                        >
                          Agreement
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://bullsclub.space/presentation/"
                          className="footer-link"
                        >
                          Learn
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="footer-link-item">
                    <h4>Comunity</h4>
                    <ul className="footer-link-list">
                      <li>
                        <a
                          href="https://spotvirtual.com/@bullsclub-93f62e312e392bb1/@bulls-conference/@patio"
                          target="blank"
                          className="footer-link"
                        >
                          Spot
                        </a>
                      </li>
                      <li>
                        <a
                          href="mailto:info@bullsclub.space"
                          target="blank"
                          className="footer-link"
                        >
                          Suggest Feature
                        </a>
                      </li>
                      <li>
                        <a
                          href="mailto:hr@bullsclub.space"
                          target="blank"
                          className="footer-link"
                        >
                          Join the team
                        </a>
                      </li>
                      <li>
                        <a
                          href="mailto:support@bullsclub.space"
                          target="blank"
                          className="footer-link"
                        >
                          Support
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p className="text-center py-4 mb-0">
              All rights reserved &copy; BULLSCLUB LLC
            </p>
          </div>
        </div>
      </footer>

      <a href="#" className="scrollToTop">
        <i className="icofont-swoosh-up"></i>
      </a>
    </div>
  );
};

export default Footer;
