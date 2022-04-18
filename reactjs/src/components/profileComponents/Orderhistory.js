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
    <thead>
      <tr>
        <td><div className="orderinfoSubTitle">Restaurant</div></td>
        <td><div className="orderinfoSubTitle">Orderdate</div></td>
        <td><div className="orderinfoSubTitle">Price</div></td>

      </tr>
      
      </thead> 
    <tbody>
    {userData.map((item) => {
      return ( 
        <tr className="orderinfo"key={item.idorders}>
          <td><div>{ getname(item.idrestaurant) }</div></td>
          <td><div>{ item.orderdate }</div></td>
          <td><div>{ item.price }€</div></td>

      </tr>
    )})}
    </tbody></>
    )

};

export default Orderhistory;