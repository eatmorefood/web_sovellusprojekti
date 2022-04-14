import React, { useState } from 'react';
import SearchPopup from '../search/SearchPopup.js';
import './Header.css';
import './HeaderButtons.css';
import jwt_decode from 'jwt-decode';
import arrowDown from '../../images/down-arrow.png';
import user from '../../images/user.png';
import logo from '../../images/logo.png';
import logo_small from '../../images/logo_small.png';
import { Link } from "react-router-dom";

function Header( props ) {
  const [query, setQuery] = useState('');
  let SearchResultElement = <></>;

  if(query.replace(/\s/g, '').length){
    SearchResultElement = <><SearchPopup query={ query } allRestaurants={ props.allRestaurants } emptyPopupSearch={ emptyPopupSearch } /></>
  }

  const handleQueryChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  }

  let decodedToken = "";
  let loggedInfname = "";
  let loggedInlname = "";
  let fnameChar = "";
  let lnameChar = "";

  if(props.jwt != null){
  decodedToken = jwt_decode(props.jwt);
  loggedInfname = decodedToken.user.fname;
  loggedInlname = decodedToken.user.lname;
  fnameChar = loggedInfname.charAt(0).toUpperCase();
  lnameChar = loggedInlname.charAt(0).toUpperCase();
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

  function emptyPopupSearch() {
    setQuery('');
    document.getElementById('query').value = '';
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
    <div id="header">
      <div className="headerContent">

        <div className="headerLeft">
            <img
              className="logoLarge"
              onClick={(e) => { e.preventDefault();
              window.location.href='/'; }}
              src={logo}
              alt="EatMoreFood">
            </img>
            <img
              className="logoSmall"
              onClick={(e) => { e.preventDefault();
              window.location.href='/'; }}
              src={logo_small} alt="EMF">
            </img>
        </div> {/* header left section ends */}

        <div className="headerMiddle">
          <form role="search" className="headerSearchForm">
            <input
              className="searchInput"
              type="search"
              id="query"
              name="q"
              placeholder="Search..."
              autoComplete="off"
              onChange = { handleQueryChange }
            />
            <button>
              <svg viewBox="0 0 1024 1024">
                <path
                  d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z">
                </path>
              </svg>
            </button>
          </form>
        </div> {/* header middle section ends */}
            
        <div className="headerRight">
          {props.userLoggedIn ?
            <div className="userDropdownContainer">
              <div id="loggedInHeaderBtns" onClick={() => toggleUserDropdown()}>
                <div id="loggedInUserIcon" ><span id="userNameCharacters">{ fnameChar }{ lnameChar }</span></div>
                <img id="loggedInArrow" src={arrowDown} alt="" />
                <div id="userDropdown" className="userDropdownContent">
                  <Link to="/profile" style={{ textDecoration: 'none' }}>
                    <div className="userDropdownOptionProfile">Profile<br></br>
                      <span>{ loggedInfname } { loggedInlname }</span>
                    </div>
                  </Link>
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    <div className="userDropdownOptionLogout" onClick={() => props.logout()}>Log out</div>
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
                window.location.href='/signup'; }}>
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

    { SearchResultElement }
    </div>
    );
}
  
export default Header;