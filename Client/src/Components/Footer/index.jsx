import React from 'react'
import {assets} from '../../assets/assets'
import './index.css'


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-about">
          <img
            src={assets.logo}
            alt="logo"
            className="footer-logo"
          />

          <p className="footer-desc">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>

          <div className="store-buttons">
            <img
              src={assets.googlePlay}
              alt="google play"
            />
            <img
              src={assets.appStore}
              alt="app store"
            />
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h2>Company</h2>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
            </ul>
          </div>

          <div>
            <h2>Get in touch</h2>
            <p>+1-234-567-890</p>
            <p>contact@example.com</p>
          </div>
        </div>
      </div>

      <p className="footer-bottom">
        Copyright {new Date().getFullYear()} ©
        <a href="https://quickshow.com"> QuickShow</a>. All Right Reserved.
      </p>
    </footer>
  );
}

export default Footer
