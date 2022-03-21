import React from "react";
import './Footer.css';
import logo from '../images/logo.png'

function Footer() {
  return (
    <div className="footerInner">
      <div className="footerTop">
        <img className="logoFooter" src={logo} alt=""></img>
      </div>
      
      <div className="footerBottom">
        <div className="footerLeft">
          <div className="footerTitle">Collaboration?</div>
          <a className="footerLink" href="/businesses">For businesses</a>
        </div>

        <div className="footerRight">
          <div className="footerTitle">Our links</div>
          <a className="footerLink" href="/support">Support</a>
          <div className="footerRightGap"/>
          <a className="footerLink" href="https://github.com/eatmorefood" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
      </div>

    </div>
  );
}

export default Footer;