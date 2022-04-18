import React, { useState, useEffect } from "react";
import axios from 'axios';
import Constants from '../../Constants.json';
import './Orderhistory.css';

const Orderhistory = (props) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const loadProfileDataWithJWT = async () => { //load user data to show here
      try {
        const results = await axios.get(Constants.API_ADDRESS + '/orders/byrestaurant/' +  props.userToken.user.id,
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
 const getfname = (id) => {
  if(props.customers){
    let result = props.customers.find(i => i.idcustomer === id)
    return result.fname
  }
}

const getlname = (id) => {
  if(props.customers){
    let result = props.customers.find(i => i.idcustomer === id)
    return result.lname
  }
}
  return (
    <>
    <div className="orderinfo">
      <div className="orderinfoSection1">
        <div className="orderinfoSection1Right">
          <div className="orderinfoSection1RightBottom">
            <div className="orderinfoSection1RightBottom">
              <div className="orderinfoSubTitle">Customer</div>
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
                  <div>{ getfname(item.idcustomer) }</div>
                  <div>{ getlname(item.idcustomer) }</div>
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