import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Constants from '../../Constants.json';
import './Restaurant.css'

function Restaurant(){
  const [restaurantData, setRestaurantData] = useState([]);
  const [restaurantFoods, setRestaurantFoods] = useState([]);
  let { id } = useParams();

  useEffect(() => { //get restaurant data
    const fetchRestaurantData = async () => {
      try {
        const results = await axios.get(Constants.API_ADDRESS + '/restaurant/' + id);
        setRestaurantData(results.data);
      } catch(error) {
        console.log("Failed to fetch restaurant data");
      }
    }

    const fetchRestaurantFoods = async () => {
        try {
          const results = await axios.get(Constants.API_ADDRESS + '/meal/byrestaurant/' + id);
          setRestaurantFoods(results.data);
        } catch(error) {
          console.log("Failed to fetch restaurant foods");
        }
      }

    fetchRestaurantData();
    fetchRestaurantFoods();
  }, [id]);

  console.log(restaurantFoods) // "restaurantFoods" -> tähän tulee array kaikista ravintolan tuotteista

    return (
        <>{restaurantData.map((item) => {
            return (
                <div className="restaurantMainContainer" key={item.idrestaurant}>   
                    <div className="restaurantName">
                        <div>{item.name}</div>   
                        <div className="restaurantContainerType">{item.type}</div>
                    </div>               
                    <img className="restaurantImage" src={ item.image }  alt="" loading="eager"/>                    
                    
                    <div className="restaurantDataContainer">
                        <div className="restaurantDataContainerLeft">
                            <div>Categories</div>
                        </div>

                        <div className="restaurantDataContainerCenter">
                            center: <br></br><br></br>
                            basically render all restaurant products here as a list jjh jh jh jh jh jh  kkj k jk jk jk j kj k j k j kj kj k j kj kj  basically render all restaurant products here as a list jjh jh jh jh jh jh  kkj k jk jk jk j kj k j k j kj kj k j kj kj  
                        </div>

                        <div className="restaurantDataContainerRight">
                            <div className="restaurantDataTitle">Restaurant details</div>
                            <div className="restaurantDataSubtitle">Address</div>
                            <div className='restaurantDataAddress'>{item.address}</div><br></br>
                            <div className="restaurantDataSubtitle">Opening times</div>
                            <div className='restaurantDataOpeningtimes'>
                                <div>**specify weekdays**</div>
                                <div className='restaurantDataGreytext'>{item.open}</div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            );
        })}</>
    )
};
export default Restaurant;