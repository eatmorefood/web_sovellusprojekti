import React, { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Restaurant from '../restaurant/Restaurant.js';
import Checkout from '../checkout/Checkout.js';

function RestaurantPaths(props) {
    const [restaurantData, setRestaurantData] = useState([]); //stores specific restaurant's data
    let [cart, setCart] = useState([]); //stores shopping cart items

    document.body.style.removeProperty("overflow"); 

    return (
        <>
        <Routes>
            <Route path='/:id' element={ <Restaurant restaurantData={ restaurantData }
                                                     setRestaurantData={ setRestaurantData }
                                                     cart={ cart }
                                                     setCart={ setCart }
                                                     jwt={ props.jwt }
                                                     showLogin={ props.showLogin } /> } />
            <Route exact path='/:id/checkout' element={<Checkout cart={ cart }
                                                                 jwt={ props.jwt }
                                                                 restaurantData={ JSON.stringify(restaurantData) } /> } />
            <Route path='*' element={<Navigate to="/" replace/>} />
        </Routes>
        </>    
    );
}

export default RestaurantPaths;