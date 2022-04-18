import React from 'react';
import './Header.css';
import './HeaderButtons.css';
import jwt_decode from 'jwt-decode';
import arrowDown from '../../images/down-arrow.png';
import user from '../../images/user.png';
import logo from '../../images/logo.png';
import logo_small from '../../images/logo_small.png';
import businesseslogo from '../../images/businesseslogo.png';
import { Link } from "react-router-dom";

function Header( props ) {
  let decodedToken = "";
  let loggedInName = "";
  let nameChar = "";


  if(props.jwt != null){
  decodedToken = jwt_decode(props.jwt);
  loggedInName = decodedToken.user.name;
  nameChar = loggedInName.charAt(0).toUpperCase();
  }

  function myFunction() { //function to show header language dropdown list
    let q = document.getElementById("myDropdown");
    let w = document.getElementById("arrowLanguage");
    if(q.style.display === "none"){
      q.style.display = "block";
      w.style.transform = "rotateX(180deg)"
    } else {
      q.style.display = "none";
      w.style.removeProperty("transform");
    }
  }

  function toggleUserDropdown() {
    let z = document.getElementById("userDropdown");
    let arr = document.getElementById("loggedInArrow");
    if(z.style.display === "none"){
      z.style.display = "block";
      arr.style.transform = "rotateX(180deg)"
    } else {
      z.style.display = "none";
      arr.style.removeProperty("transform");
    }
  }
    
  window.onclick = function(event) { //close the language dropdown if the user clicks outside of the dropdown element
    if (props.jwt === null && document.getElementById("myDropdown").style.display === 'block') {
      let a = document.getElementById('dropdownLanguage');
      let b = document.getElementById('dropbtnLanguage');
      let c = document.getElementById('arrowLanguage');
      if(!a.contains(event.target) && !b.contains(event.target) && !c.contains(event.target)){
        myFunction();
      }
    } 
    if (props.jwt !== null && document.getElementById("userDropdown").style.display === 'block'){ //close logged in user icon dropdown if clicked outside dropdown or the user icon
      let a = document.getElementById('loggedInHeaderBtns');
      let b = document.getElementById('userNameCharacters');
      let c = document.getElementById('loggedInArrow');
      let d = document.getElementById('userDropdown');
      if (!a.contains(event.target) && !b.contains(event.target) && !c.contains(event.target) && !d.contains(event.target)) {
        toggleUserDropdown();
      }
    }
  }

  return (
    <div className="header">
      <div className="headerContent">

        <div className="headerLeft">
            <img
              className="logoLarge"
              onClick={(e) => { e.preventDefault();
              window.location.href='/business'; }}
              src={logo}
              alt="EatMoreFood">
            </img>
            <img
            className="businesslogo"
            src={businesseslogo}
            alt="For businesses"
            onClick={(e) => { e.preventDefault();
              window.location.href='/business'; }}/>
            <img
              className="logoSmall"
              onClick={(e) => { e.preventDefault();
              window.location.href='/business'; }}
              src={logo_small} alt="EMF">
            </img>
        </div> {/* header left section ends */}

        <div className="headerMiddle">
                <div>{loggedInName}</div>
        </div> {/* header middle section ends */}
            
        <div className="headerRight">
          {props.userLoggedIn ?
            <div id="loggedInHeaderBtns" onClick={() => toggleUserDropdown()}>
              <div id="loggedInUserIcon" ><span id="userNameCharacters">{ nameChar }</span></div>
              <img id="loggedInArrow" src={arrowDown} alt="" />
              <div className="userDropdownContainer">
                <div id="userDropdown" className="userDropdownContent">
                  <Link to="/business/profile" style={{ textDecoration: 'none' }}>
                    <div>Profile<br></br>
                      <span>{ loggedInName }</span>
                    </div>
                  </Link>
                  <Link to="/business" style={{ textDecoration: 'none' }}>
                    <div onClick={() => props.logout()}>Log out</div>
                  </Link>
                </div>
              </div>
            </div>
            :
          <>
          <img className="userIcon" src={user} alt="" onClick={ props.displayLogin }/>
            <div className="btnDiv">
              <button className="loginBtnHeader" onClick={ props.displayLogin }><span className="loginSpan">Log in</span></button>
              <button
                className="signupBtnHeader"
                onClick={(e) => { e.preventDefault();
                window.location.href='/business/signup'; }}>
                <span>Sign up</span>
              </button>
              
              <div id="dropdownLanguage">
                <button onClick={() => myFunction()} id="dropbtnLanguage">Language
                  <img id="arrowLanguage" src={arrowDown} alt="" height="10" width="10" />
                </button>
                <div id="myDropdown" onClick={() => myFunction()}>
                    <option>English</option>
                    <option onClick={() => alert("Sorry, Finnish is not available at the moment")}>Finnish</option>
                </div>
              </div>
            </div>
            </>
          }
        </div> {/* header right section ends */}

      </div>
    </div>
    );
}
  
export default Header;