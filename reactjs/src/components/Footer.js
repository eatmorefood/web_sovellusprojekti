import React from "react";
import './Footer.css';
import logo from '../images/logo.png'

function Footer() {
  return (
    <div className="footerInner">
      <div className="footerTop">
        <img className="logo" src={logo} alt=""></img>
      </div>
      
      <div className="footerBottom">
        <div className="footerLeft">
          <div className="title">Collaboration?</div>
          <a href="/businesses">For businesses</a>
        </div>

        <div className="footerRight">
          <div className="title">Our links</div>
          <a href="/support">Support</a>
          <div className="gap"/>
          <a href="https://github.com/eatmorefood" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
      </div>

    </div>
  );
}

export default Footer;