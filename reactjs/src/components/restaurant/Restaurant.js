import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Constants from '../../Constants.json';
import './Restaurant.css';
import './RestaurantFood.css';
import SrcollToTop from '../functional/ScrollToTop.js';
import SingleFoodItem from './SingleFoodItem.js';
import HandleClickOutside from "../functional/HandleCLickOutside.js";
import ShoppingCart from '../shoppingCart/ShoppingCart.js';

function Restaurant(props){ //displays single restaurant page
    let { id } = useParams();
    const navigate = useNavigate();

    const [restaurantData, setRestaurantData] = useState([]); //stores specific restaurant's data
    const [restaurantFoods, setRestaurantFoods] = useState([]); //stores all foods for specific restaurant
    let [foodCategories, setFoodCategories] = useState([]); //stores all food categories
    const {ref, displayFoodPopup, setDisplayFoodPopup} = HandleClickOutside(false); //display / hide single restaurant item when clicked
    const [foodPopupItemData, setFoodPopupItemData] = useState([null]); //stores clicked single food itme's data
    const {cartRef, cartVisibility, switchCartVisibility} = HandleClickOutside(false); //handles hiding / showing shopping cart
    let [cart, setCart] = useState([]); //stores shopping cart items
    const [userJWT, setUserJWT] = useState(props.jwt); //stores user JWT

    let singleFoodItemPopup = <></>;
    let foodNotFoundMessage = <></>;
    let shoppingCartBar = <></>;
    let shoppingCartPopup = <></>;

    console.log("track re render")
    
//====================================== HANDLES SHOPPING CART ACTIONS =========================================
    const getTotalSum = () => { //calculate total cart sum
        let totalSum = 0;
        for (let i = 0; i < cart.length; i++) {
            totalSum += cart[i].singlePrice*cart[i].qty;
        }
        return totalSum.toFixed(2);
    };

    const totalQty = cart.reduce(function(prev, cur) { //calculate total quantity of cart items
        return prev + cur.qty;
    }, 0);   

    if(Array.isArray(cart) && cart.length){ //if cart has content...
        shoppingCartBar = <><div className="shoppingCartBarContent">
                                <div className="shoppingCartBarTotalQuantity">{totalQty}</div>
                                <div>Display order</div>
                                <div className="shoppingCartBarTotalCost">{getTotalSum()}€</div>
                            </div></>;
    }

    useEffect(() => { setUserJWT(props.jwt) }, [props.jwt]); //update user jwt on login

    const AddItemToCart = (product) => {
        if(userJWT === null){
            alert("Please login first")
        } else {
            setDisplayFoodPopup(false)      
            setCart([...cart, product]); //push new item to cart
        }
    }

    const ModifyCartItem = (product) => {    
        const prodIndex = cart.findIndex(obj => obj.id === product.id);
        const updatedProdObj = { ...cart[prodIndex], qty: product.qty};

        const updatedCart = [
        ...cart.slice(0, prodIndex),
        updatedProdObj,
        ...cart.slice(prodIndex + 1),
        ];

        setCart(updatedCart);
    }

    const RemoveCartItem = (itemID) => {
        const updatedCart = cart.filter((item) => item.id !== itemID);
        setCart(updatedCart);
    }

    const ModifyCartItemQty = (item) => {   
        const prodIndex = cart.findIndex(obj => obj.id === item.id);
        const updatedProdObj = { ...cart[prodIndex], qty: item.qty};

        const updatedCart = [
        ...cart.slice(0, prodIndex),
        updatedProdObj,
        ...cart.slice(prodIndex + 1),
        ];

        setCart(updatedCart);
    }

    if(cartVisibility === true){ //if restaurant food items are not found..
        shoppingCartPopup = <div ref={cartRef}><ShoppingCart cart={cart}
                                                            closeBtn={() => switchCartVisibility(!cartVisibility)}
                                                            totalSum={() => getTotalSum()}
                                                            totalQty={totalQty}
                                                            modifyQty={ModifyCartItemQty}
                                                            removeCartItem={RemoveCartItem}/>
                                                            </div>;
    }

//===================== HANDLES HIDING / DISPLAYING SINGLE FOOD ITEM CARD =================================
    if(displayFoodPopup === true){
        singleFoodItemPopup = <div ref={ref}><SingleFoodItem itemData={foodPopupItemData}
                                                             closeBtn={() => setDisplayFoodPopup(!displayFoodPopup)}
                                                             addItemToCart={AddItemToCart}
                                                             modifyCartItem={ModifyCartItem}
                                                             cart={cart}/></div>;
    }

//============================================== HANDLES POPUP CARDS BACKGROUND ========================================
    if(displayFoodPopup === true || cartVisibility === true){
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
    } else if(displayFoodPopup === false && cartVisibility === false){
        document.body.style.removeProperty("overflow"); 
    }

    window.onclick = () => {
        if(displayFoodPopup === false && cartVisibility === false){ //adjusts app background back to normal when popups are not visible
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
                <div id="shoppingCartPopup" >{ shoppingCartPopup }</div>
                <div id="singleRestItemPopupBox" >{ singleFoodItemPopup }</div>
                <div id="restaurantMainContainer">
                    <div className="restaurantName">
                        <div>{item.name}</div>   
                        <div className="restaurantContainerType">{item.type}</div>
                    </div>
                    <div id="shoppingCartBar" onClick={() => switchCartVisibility(!cartVisibility)}>{ shoppingCartBar }</div>               
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