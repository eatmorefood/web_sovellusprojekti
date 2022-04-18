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
      let result = props.restaurants.find(i => i.idrestaurant === id)
      return result.name
    }
  }

  return (
    <>
    <div className="orderinfo">
      <div className="orderinfoSection1">
        <div className="orderinfoSection1Right">
          <div className="orderinfoSection1RightBottom">
            <div className="orderinfoSection1RightBottom">
              <div className="orderinfoSubTitle">Restaurant</div>
            </div>
            <div className="orderinfoSection1RightBottom">
              <div className="orderinfoSubTitle">Orderdate</div>
            </div>
            <div className="orderinfoSection1RightBottom">
              <div className="orderinfoSubTitle">Price</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {userData.map((item) => {
      return ( 
        <div className="orderinfo"key={item.idorders}>
          <div className="orderinfoSection1">
            <div className="orderinfoSection1Right">
              <div className="orderinfoSection1RightBottom1">
                  <div>{ getname(item.idrestaurant) }</div>
                  <div>{ item.orderdate }</div>
                  <div>{ item.price }€</div>
            </div>
          </div>
        </div>
      </div>
    )})}</>
    )
};

export default Orderhistory;