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
        setUserData(results.data.rows);
      } catch(error) {
          console.log("something went wrong");
      }
    }
    loadProfileDataWithJWT();
  }, [props]); //dependency array includes only props => triggers useEffect only when component mounts

 // console.log(JSON.stringify(userData))

  const getname = (id) => {
    if(props.restaurants){
      let result = props.restaurants.find(i => i.idrestaurant == id)
      return result.name
    }
  }

  return (
    <>{userData.map((item) => {
      return ( 
        <div className="orderinfo"key={item.idorders}> 
          <div className="personalinfoSection1">
            <div className="personalinfoSection1Right">
              <div className="personalinfoSection1RightBottom">
                <div className="personalinfoSection1RightBottomLeft">
                <div className="personalinfoSubTitle">Restaurant</div>
                  <div>{ getname(item.idrestaurant) }</div>
                </div>
                <div className="personalinfoSection1RightBottomLeft">
                  <div className="personalinfoSubTitle">Orderdate</div>
                  <div>{ item.orderdate }</div>
                </div>
                <div className="personalinfoSection1RightBottomLeft">
                <div className="personalinfoSubTitle">Price</div>
                  <div>{ item.price }€</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )})}</>
    )
};

export default Orderhistory;