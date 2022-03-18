import React from 'react';
import './Header.css';
import './HeaderButtons.css';
import arrowDown from '../images/down-arrow.png';
import user from '../images/user.png';
import logo from '../images/logo.png';
import logo_small from '../images/logo_small.png';

function Header() {

    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
        document.getElementById("arrow").classList.toggle("arrowPosition");
      }
      
      // Close the dropdown if the user clicks outside of it
      window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
              document.getElementById("arrow").classList.remove("arrowPosition");
            }
          }
        }
      }

    return (
    <div className="header">
      <div className="headerContent">

          <div className="headerLeft">
              <img className="logo" onClick={(e) => { e.preventDefault(); window.location.href='/'; }} src={logo} alt="EatMoreFood"></img>
              <img className="logoSmall" onClick={(e) => { e.preventDefault(); window.location.href='/'; }} src={logo_small} alt="EMF"></img>
          </div>

          <div className="headerMiddle">
            <form role="search" id="form">
              <input type="search" id="query" name="q" placeholder="Search..." autoComplete="off"/>
              <button>
                <svg viewBox="0 0 1024 1024"><path d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"></path></svg>
              </button>
            </form>
          </div>
              
          <div className="headerRight">
            <img className="icon" src={user} alt="" onClick={() => myFunction()}/>
              <div className="btnDiv">

                  <button className="login" onClick={(e) => { e.preventDefault(); window.location.href='/home'; }}><span>Log in</span></button>
              
                
                  <button className="signup" onClick={(e) => { e.preventDefault(); window.location.href='/sdgsd'; }}><span>Sign up</span></button>
                

                <div className="dropdown">
                  <button onClick={() => myFunction()} className="dropbtn">Language
                    <img id="arrow" src={arrowDown} alt="" height="10" width="10" />
                  </button>
                  <div id="myDropdown" className="dropdown-content" >
                      <option>English</option>
                      <option onClick={() => alert("Sorry, Finnish is not available at the moment")}>Finnish</option>
                  </div>
                </div>
              </div>
          </div>

      </div>
    </div>
    );
}
  
export default Header;