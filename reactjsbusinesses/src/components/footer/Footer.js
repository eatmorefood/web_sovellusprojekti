import React from "react";
import './Footer.css';
import logo from '../../images/logo.png'
import businesseslogo from '../../images/businesseslogo.png';

function Footer() {
  return (
    <div className="footerInner">
      <div className="footerTop">
        <img className="logoFooter" src={logo} alt=""></img>
        <img className="businesslogo" src={businesseslogo} alt="Businesses logo"/>
      </div>
      
      <div className="footerBottom">
        <div className="footerLeft">
          <div className="footerTitle">Consumer page</div>
          <a className="footerLink" href="/">Link to consumer page</a>
        </div>

        <div className="footerRight">
          <div className="footerTitle">Our links</div>
          <a className="footerLink" href="/business/support">Support</a>
          <div className="footerRightGap"/>
          <a className="footerLink" href="https://github.com/eatmorefood" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
      </div>

    </div>
  );
}

export default Footer;