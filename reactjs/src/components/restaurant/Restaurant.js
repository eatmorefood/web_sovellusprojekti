import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Constants from '../../Constants.json';
import './Restaurant.css';
import './RestaurantFood.css';
import SrcollToTop from '../functional/ScrollToTop.js';
import SingleFoodItem from './SingleFoodItem.js';
import HandleClickOutside from "../functional/HandleCLickOutside.js";

function Restaurant({ jwt }){ //displays single restaurant page
    let { id } = useParams();
    const navigate = useNavigate();

    const [restaurantData, setRestaurantData] = useState([]); //stores specific restaurant's data
    const [restaurantFoods, setRestaurantFoods] = useState([]); //stores all foods for specific restaurant
    let [foodCategories, setFoodCategories] = useState([]); //stores all food categories
    const {ref, displayFoodPopup, setDisplayFoodPopup} = HandleClickOutside(false);; //display / hide single restaurant item when clicked
    const [foodPopupItemData, setFoodPopupItemData] = useState([null]); //stores clicked single food itme's data
    //const [userJWT, setUserJWT] = useState(jwt);

    //console.log(userJWT)
    console.log("track re render")  

    let singleFoodItemPopup = <></>;
    let foodNotFoundMessage = <></>;

//===================== HANDLES HIDING / DISPLAYING SINGLE FOOD ITEM CARD WHEN CLICKED =========================
    if(displayFoodPopup === true){ //if restaurant food items are not found..
        singleFoodItemPopup = <div ref={ref}><SingleFoodItem itemData={foodPopupItemData}
                                                             closeBtn={() => setDisplayFoodPopup(!displayFoodPopup)}/></div>;

        let app = document.getElementById("restaurantMainContainer"); //this block of code adjusts popup background
        let a = document.getElementById("header");
        let b = document.getElementById("footer");
        app.style.filter = "blur(10px)";
        app.style.pointerEvents = "none";     
        a.style.filter = "blur(10px)";
        a.style.pointerEvents = "none";
        b.style.filter = "blur(10px)";
        b.style.pointerEvents = "none";
        document.body.style.overflow = "hidden";
    } else if(displayFoodPopup === false){
        document.body.style.removeProperty("overflow"); 
    }

    window.onclick = () => {
        if(displayFoodPopup === false){ //this block of code adjusts app background back to normal when popup not visible
            let app = document.getElementById("restaurantMainContainer");
            let a = document.getElementById("header");
            let b = document.getElementById("footer");
            app.style.filter = "none";
            app.style.pointerEvents = "all";     
            a.style.filter = "none";
            a.style.pointerEvents = "all";
            b.style.filter = "none";
            b.style.pointerEvents = "all"; 
        }
    }

    const OpenFoodPopup = (item) => { //executes when single food item is clicked
        setFoodPopupItemData(item)
        setDisplayFoodPopup(true);
    };

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

//================================================= RENDER =================================================
    return (
        <>{restaurantData.map((item, index) => {
            return (
                <div key={index}>
                <div id="singleRestItemPopupBox" >{ singleFoodItemPopup }</div>
                <div id="restaurantMainContainer">
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
                                        }).map((item => (
                                            <div id="restaurantFoodItem"
                                                key={item.idfood}
                                                onClick={() => OpenFoodPopup(item)}>
                                                <div id="restaurantFoodItemContainer" >
                                                    <div id="restaurantFoodItemContainerLeft">
                                                        <img id="restaurantFoodItemPhoto" src={item.image} alt="" loading="eager"/>
                                                    </div>
                                                    <div id="restaurantFoodItemContainerRight">
                                                        <div id="restaurantFoodItemName">{item.name}</div>
                                                        <div id="restaurantFoodItemDescription">{item.description}</div>
                                                        <div id="restaurantFoodItemPrice">{item.price}€</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )))}
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
            </div>);
        })}</>
    )
};

export default Restaurant;