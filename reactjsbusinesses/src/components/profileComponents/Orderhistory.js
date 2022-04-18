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
    <thead>
      <tr>
        <td><div className="orderinfoSubTitle">Customer</div></td>
        <td><div className="orderinfoSubTitle">Orderdate</div></td>
        <td><div className="orderinfoSubTitle">Price</div></td>

      </tr>
      
      </thead>             

    <tbody>
    {userData.map((item) => {
      return ( 
        <tr className="orderinfo"key={item.idorders}>
          <td><div>{ getfname(item.idcustomer) } { getlname(item.idcustomer) }</div></td>
          <td><div>{ item.orderdate }</div></td>
          <td><div>{ item.price }€</div></td>

      </tr>
    )})}
    </tbody></>
    )
};

export default Orderhistory;