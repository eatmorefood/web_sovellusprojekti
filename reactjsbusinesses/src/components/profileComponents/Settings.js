<<<<<<< HEAD
import React from "react";

function Settings() {

  return (
    <div className="settings">

        <div>This is psettings</div>
        <img className="haha" alt=""></img>

=======
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Constants from '../../Constants.json';
import './Settings.css';

const Settings = (props) => {
  const [userData, setUserData] = useState([]);
  /*let display_date_created = '';
  let account_age = 0;
  let account_age_message = '';

  if(userData.creation_date){ //this sets the display style of account creation date and calculates account age which is displayed
    let dateParts = userData.creation_date.split('/');
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let current_month = months[dateParts[0]];
    display_date_created = (current_month + ' ' + dateParts[1] + '. ' + dateParts[2]);

    const d = new Date();
    let x = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();
    let date_created = new Date(userData.creation_date)
    let date_today = new Date(x);
    let time_passed = Math.abs(date_today - date_created);
    let days_passed = Math.ceil(time_passed / (1000 * 60 * 60 * 24)); 
    account_age = days_passed;

    if(account_age === 1){
      account_age_message = "You've been our customer for " + account_age + " day";
    } else if (account_age !== 1){
      account_age_message = "You've been our customer for " + account_age + " days";
    }
  } */

  useEffect(() => {
    const loadProfileDataWithJWT = async () => { //load user data to show here
      try {

        const results = await axios.get(Constants.API_ADDRESS + '/business/profile-data/' +  props.userToken.user.id,
        {
            headers: {
                'Authorization': 'Bearer ' + props.userJWT
            }
        })
        setUserData(results.data.rows[0]);
      } catch(error) {
        console.log(error);
          console.log("something went wrong");
      }
    }
    loadProfileDataWithJWT();
  }, [props]); //dependency array includes only props => triggers useEffect only when component mounts

  return (
    <div className="ProfileSettings">
        <div className="ProfileSettingsItem">
          <div className="ProfileSettingsItemTitle">Name</div>
          <div className="ProfileSettingsItemValue">{userData.name}</div>
        </div>
        <div className="ProfileSettingsItem">
          <div className="ProfileSettingsItemTitle">Email</div>
          <div className="ProfileSettingsItemValue">{userData.email}</div>
        </div>
        <div className="ProfileSettingsItem">
          <div className="ProfileSettingsItemTitle">Address</div>
          <div className="ProfileSettingsItemValue">{userData.address}</div>
        </div>
        <div className="ProfileSettingsItem">
          <div className="ProfileSettingsItemTitle">Open</div>
          <div className="ProfileSettingsItemValue">{userData.open}</div>
        </div>
        <div className="ProfileSettingsItem">
          <div className="ProfileSettingsItemTitle">Type</div>
          <div className="ProfileSettingsItemValue">{userData.type}</div>
        </div>
        <div className="ProfileSettingsItem">
          <div className="ProfileSettingsItemTitle">Price level</div>
          <div className="ProfileSettingsItemValue">{userData.pricelevel}</div>
        </div>
        <div className="ProfileSettingsItem">
          <div className="ProfileSettingsItemTitle">Log out of EatMoreFood</div>
          <Link to="/" style={{ textDecoration: 'none' }}>                
            <div className="ProfileSettingsItemValue" onClick={() => props.logout()}>Log out</div>
          </Link>
        </div>
>>>>>>> 50559b3e15ff1f097ae8639e86e2265c90424b01
    </div>
  );
}

export default Settings;