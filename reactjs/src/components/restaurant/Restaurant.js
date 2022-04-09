import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Constants from '../../Constants.json';
import './Restaurant.css'
import './RestaurantFood.css'
import SrcollToTop from '../functional/ScrollToTop.js'

function Restaurant(){
    const [restaurantData, setRestaurantData] = useState([]);
    const [restaurantFoods, setRestaurantFoods] = useState([]);
    let [foodCategories, setFoodCategories] = useState([]);
    let { id } = useParams();
    const navigate = useNavigate();
    let foodNotFoundMessage = <></>

//===================== HANDLES CATEGORY CLICKING AND SCROLLING TO CLICKED FOOD CATEGORY =========================
    const refs = restaurantFoods.reduce((item, value) => { 
        item[value.category] = React.createRef();
        return item;
    }, {});

    const handleClick = category =>
    refs[category].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });

//================================================================================================================

    useEffect(() => { //on render do the following...
        if(/^\d+$/.test(id) === false){ //if restaurant ID in path contains other than numbers
            navigate('/notfound'); //redirect to not found
        }

        const fetchRestaurantData = async () => { //gets restaurant data
            try {
                const results = await axios.get(Constants.API_ADDRESS + '/restaurant/' + id);
                if(!Array.isArray(results.data) || !results.data.length){
                    // *above if -statement* checks if restaurant was found (api request has data), otherwise redirect to not found page
                    navigate('/notfound'); //redirect to not found
                } else {
                    setRestaurantData(results.data); //save restaurant data if restaurant found

                    const fetchRestaurantFoods = async () => { //get food items for restaurant
                        try {
                            const results = await axios.get(Constants.API_ADDRESS + '/meal/byrestaurant/' + id);
                            setRestaurantFoods(results.data); //save food items if found
                            setFoodCategories(results.data.map(({ category }) => category)); //get all food categories and save them into an array
                        } catch(error) {
                        console.log("Failed to fetch restaurant foods");
                        }
                    }
                    fetchRestaurantFoods();
                }
            } catch(error) { //if fails to fetch restaurant data
                console.log("Failed to fetch restaurant data");
            }
        }

        fetchRestaurantData(); //this actually calls the axios await -> gets restaurant data on render
    }, [id, navigate]);

    if(!Array.isArray(restaurantFoods) || !restaurantFoods.length){ //if restaurant food items are not found..
        foodNotFoundMessage = <><div>Sorry!<br></br>We could not find any food items for this restaurant.</div></>
    }

    console.log("track re render")

    return (
        <>{restaurantData.map((item, index) => {
            return (
                <div className="restaurantMainContainer" key={index}>   
                    <div className="restaurantName">
                        <div>{item.name}</div>   
                        <div className="restaurantContainerType">{item.type}</div>
                    </div>               
                    <img className="restaurantImage" src={ item.image }  alt="" loading="eager"/>                    
                    
                    <div className="restaurantDataContainer">
                        <div className="restaurantDataContainerLeft">
                            <div id="categoriesStickyScrollable">
                                <h3>Categories</h3>
                                
                                <div className="restaurantDataContainerLeftCategories" >
                                {
                                
                                    foodCategories.map((category, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="restaurantDataContainerLeftCategoryTitle"
                                                    onClick={() => handleClick(category)}>{ category }</div>
                                            </div>
                                        )
                                    })
                                    
                                }
                                </div>
                            </div>
                        </div>

                        <div className="restaurantDataContainerCenter">
                            { foodNotFoundMessage }
                            {
                                foodCategories.map((category, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="restaurantFoodItemCategoryTitle"
                                                ref={refs[category]}>{ category }</div>
                                            <div className="restaurantFoodCategoryDivider"/>
                                        <div>{
                                        restaurantFoods.filter(item => {
                                            if (item.category.toLowerCase().includes(category.toLowerCase())) {
                                                return item;
                                            } else {
                                                return null;
                                            }
                                        }).map((item, index) => (
                                            <div id="restaurantFoodItem" key={index}>
                                                <div className="restaurantFoodItemContainer" >
                                                    <div className="restaurantFoodItemContainerLeft">
                                                        <img className="restaurantFoodItemPhoto" src={item.image} alt="" loading="eager"/>
                                                    </div>
                                                    <div className="restaurantFoodItemContainerRight">
                                                        <div className="restaurantFoodItemName">{item.name}</div>
                                                        <div className="restaurantFoodItemDescription">{item.description}</div>
                                                        <div className="restaurantFoodItemPrice">{item.price}€</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                )})
                            }
                        </div>

                        <div id="restaurantDataContainerRight">
                        <SrcollToTop />
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