import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Restaurant from '../restaurant/Restaurant.js';
import Checkout from '../checkout/Checkout.js';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Constants from '../../Constants.json';

function RestaurantPaths(props) {
    const [restaurantData, setRestaurantData] = useState([]); //stores specific restaurant's data
    let [cart, setCart] = useState([]); //stores shopping cart items
    let [restaurantName, setRestaurantName] = useState("");
    const [customerData, setCustomerData] = useState([]);
    let decodedToken = null;
    if(props.jwt !== null){
        decodedToken = jwt_decode(props.jwt);
    }

    document.body.style.removeProperty("overflow");

    useEffect(() => {
        if(decodedToken !== null){
            const loadCustomerDataWithJWT = async () => {          
                try {
                const results = await axios.get(Constants.API_ADDRESS + '/customer/profile-data/' +  decodedToken.user.id,
                {
                    headers: {
                        'Authorization': 'Bearer ' + props.jwt
                    }
                })
                setCustomerData(results.data.rows[0]);
                } catch(error) {
                    console.log("something went wrong");
                }
            }
            loadCustomerDataWithJWT();
        }        
    }, [props]);

    return (
        <>
        <Routes>
            <Route path='/:id' element={ <Restaurant restaurantData={ restaurantData }
                                                     setRestaurantData={ setRestaurantData }
                                                     cart={ cart }
                                                     setCart={ setCart }
                                                     showLogin={ props.showLogin }
                                                     jwt={ props.jwt }
                                                     /> } />
            <Route exact path='/:id/checkout' element={<Checkout cart={ cart }
                                                                 customerData={customerData}
                                                                 setRestaurantData={ setRestaurantData }
                                                                 setCart={ setCart }
                                                                 restaurantData={ JSON.stringify(restaurantData) }
                                                                 restaurantName={ restaurantName }
                                                                 setRestaurantName={ setRestaurantName }/> } />
            <Route path='*' element={<Navigate to="/" replace/>} />
        </Routes>
        </>    
    );
}

export default RestaurantPaths;