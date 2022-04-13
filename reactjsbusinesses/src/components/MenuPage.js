import React from "react";
import muffin from "../images/muffinDance.gif";
import jwt_decode from 'jwt-decode';
import './MenuPage.css';

function MenuPage( props ) {

    let decodedToken = "";
    let loggedInName = "";
  
  
    if(props.jwt != null){
    decodedToken = jwt_decode(props.jwt);
    loggedInName = decodedToken.user.name;
    }
    console.log(props);
    console.log(loggedInName);
    console.log("asd");

  return (
    <div className="menupage">
        <div>
          <h1 className="businessTitle">{loggedInName}</h1>
        </div>
        <div>This is logged in main page (MenuPage.js)</div>
        <img className="haha" alt="" src={muffin}></img>


    </div>
  );
}

export default MenuPage;