import React, { useState, useEffect } from "react";
import axios from 'axios';
import Constants from '../../Constants.json';
import './Orderhistory.css';

const Orderhistory = (props) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const loadProfileDataWithJWT = async () => { //load user data to show here
      try {
        const results = await axios.get(Constants.API_ADDRESS + '/orders/' +  props.userToken.user.id,
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
            <div className="personalinfoSection1Right">
              <div className="personalinfoSection1RightBottom">
                <div className="personalinfoSection1RightBottomLeft">
                <div className="personalinfoSubTitle">Restaurant</div>
                  <div>{ userData.price }€</div>
                </div>
                <div className="personalinfoSection1RightBottomLeft">
                  <div className="personalinfoSubTitle">Orderdate</div>
                  <div>{ userData.orderdate }</div>
                </div>
                <div className="personalinfoSection1RightBottomLeft">
                <div className="personalinfoSubTitle">Price</div>
                  <div>{ userData.price }€</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
};

export default Orderhistory;