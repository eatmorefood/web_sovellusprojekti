import React, { useState, useEffect } from "react";
import axios from 'axios';
import muffin from "../images/muffinDance.gif";
import jwt_decode from 'jwt-decode';
import './MenuPage.css';
import Constants from '../Constants.json';
import FoodGrid from './FoodGrid'
import editbtn from '../images/editbtn.png';
import EditMenu from './EditMenu.js';
import {useNavigate} from "react-router-dom";


function MenuPage ( props ) {
  const [userData,setUserData] = useState([]);

    let decodedToken = "";
    let loggedInName = "";
  
  
    if(props.jwt != null){
    decodedToken = jwt_decode(props.jwt);
    loggedInName = decodedToken.user.name;
    }


    useEffect(() => {
      const loadProfileDataWithJWT = async () => { //load user data to show here
        try {
          console.log(props);
          console.log(decodedToken);
          const results = await axios.get(Constants.API_ADDRESS + '/meal/byrestaurant/' +  decodedToken.user.id,
          {
              headers: {
                  'Authorization': 'Bearer ' + props.jwt
              }
          })
          console.log(results.data);
          if (results.data && results.data.length > 0)
          {
          setUserData(results.data);
          }
        } catch(error) {
          console.log(error);
            console.log("something went wrong");
        }
      }
      loadProfileDataWithJWT();
    }, [props]);

    function editMenu ( props )
    {
      console.log(userData);
      console.log("Edited");
    }

    console.log(userData);

    let navigation = useNavigate();

    function navigate()
    {
        return function ()
        {
            let path = "editmenu/new"; 
            navigation(path);
        }
    }

    
  return (
    <div className="menupage">
        <div>
          <h1 className="businessTitle">{loggedInName}</h1>
        </div>
        <div>This is logged in main page (MenuPage.js)</div>
        <img className="haha" alt="" src={muffin}></img>

        <div className="grid"><FoodGrid arrOfFood={userData}/></div>
        <div className="newMeal" onClick={navigate()}>Add new meal</div>
        



    </div>

    
  );
}

export default MenuPage;