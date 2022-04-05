import React, { useState, useEffect } from "react";
import axios from 'axios';
import Constants from '../../Constants.json';
import './Personalinfo.css';

const Personalinfo = (props) => {
  const [userData, setUserData] = useState([]);
  let PersonalInfoFnameChar = props.userToken.user.fname.charAt(0).toUpperCase();
  let PersonalInfoLnameChar = props.userToken.user.lname.charAt(0).toUpperCase();

  useEffect(() => {
    const loadProfileDataWithJWT = async () => { //load user data to show here
      try {
        const results = await axios.get(Constants.API_ADDRESS + '/customer/profile-data/' +  props.userToken.user.id,
        {
            headers: {
                'Authorization': 'Bearer ' + props.userJWT
            }
        })
        setUserData(results.data.rows[0]);
      } catch(error) {
          console.log("something went wrong");
      }
    }
    loadProfileDataWithJWT();
  }, [props]); //dependency array includes only props => triggers useEffect only when component mounts

  return (
    <div className="personalinfo">
      <div className="personalinfoSection1">
        <div className="personalinfoSection1Left"><span>{PersonalInfoFnameChar}{PersonalInfoLnameChar}</span></div>
        <div className="personalinfoSection1Right">
          <div className="personalinfoSection1RightTop">{userData.fname} {userData.lname}</div>
          <div className="personalinfoSection1RightBottom">
            <div className="personalinfoSection1RightBottomLeft">
              <div className="personalinfoSubTitle">Email</div>
              <div>{ userData.email }</div>
            </div>
            <div className="personalinfoSection1RightBottomLeft">
            <div className="personalinfoSubTitle">Mobile number</div>
              <div>{ userData.phonenumber }</div>
            </div>
          </div>
        </div>
      </div>
        
    </div>
  );
}

export default Personalinfo;