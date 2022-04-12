import React, { useState, useEffect } from "react";
import axios from 'axios';
import Constants from '../../Constants.json';
import './Personalinfo.css';

const BusinessInfo = (props) => {
  const [userData, setUserData] = useState([]);
  let BusinessInfoNameChar = props.userToken.user.name.charAt(0).toUpperCase();

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
          console.log("something went wrong");
      }
    }
    loadProfileDataWithJWT();
  }, [props]); //dependency array includes only prop => triggers useEffect only when component mounts

  console.log(userData);

  return (
    <div className="personalinfo">
      <div className="personalinfoSection1">
        <div className="personalinfoSection1Left"><span>{BusinessInfoNameChar}</span></div>
        <div className="personalinfoSection1Right">
          <div className="personalinfoSection1RightTop">{userData.name}</div>
          <div className="personalinfoSection1RightBottom">
            <div className="personalinfoSection1RightBottomLeft">
              <div className="personalinfoSubTitle">Email</div>
              <div>{ userData.email }</div>
            </div>
            <div className="personalinfoSection1RightBottomLeft">
            <div className="personalinfoSubTitle">Address</div>
              <div>{ userData.address }</div>
            </div>
            <div className="personalinfoSection1RightBottomLeft">
              <div className="personalinfoSubTitle">Open</div>
              <div>{userData.open}</div>
            </div>
            <div className="personalinfoSection1RightBottomLeft">
              <div className="personalinfoSubTitle">Type</div>
              <div>{userData.type}</div>
            </div>
            <div className="personalinfoSection1RightBottomLeft">
              <div className="personalinfoSubTitle">Price level</div>
              <div>{userData.pricelevel}</div>
            </div>
          </div>
        </div>
      </div>
        
    </div>
  );
}

export default BusinessInfo;