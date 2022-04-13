import React, { useState, useEffect } from 'react';
import './SingleFoodItem.css';
import CloseSingleItemPopup from '../../images/closeBtnCircle.png';
import Minus from '../../images/minus.png';
import Plus from '../../images/plus.png';

function SingleFoodItem(props){ //displays single restaurant food item
    let [quantity, setQuantity] = useState(1);

    const itemAlreadyInCart = props.cart.some(element => { //check if item exists in cart
        if (element.id === props.itemData.idfood) {
          return true;
        } else {
            return null;
        }
    });

    let product = { //create product object for shopping cart
            id: props.itemData.idfood,
            name: props.itemData.name,
            singlePrice: props.itemData.price,
            qty: quantity
        };
    
    const switchQuantity = (char) => { //handle quantity adjustment
        if(char === '-'){
            if(quantity !== 1){
                setQuantity(quantity - 1);
            }            
        } else if(char === '+' && quantity < 100){
            setQuantity(quantity + 1);
        } 
    };

    function HandleItemOperation(){
        if(itemAlreadyInCart){ //if item is already in cart, execute cart modification
            props.modifyCartItem(product);
        } else { //else add item as a new object
            props.addItemToCart(product);
        }        
    }

    useEffect(() => {
        if(itemAlreadyInCart){ //check if item already in cart
            setQuantity(props.cart.find(x => x.id === props.itemData.idfood).qty); //if yes, update displayed quantity
            document.getElementById("addToCartBtnText").innerHTML = "Update cart"; //switch "add to cart" text to "update cart"
        };
    }, [itemAlreadyInCart, props.cart, props.itemData.idfood]);

    return (    
        <div className="singleFoodItemPopup">
            <div className="singleFoodItemPopupContainerTop">
                <img className="singleFoodItemPopupCloseBtn" src={CloseSingleItemPopup} onClick={props.closeBtn} alt="x" />
                <img className="singleFoodItemPopupPhoto" src={props.itemData.image} alt="no icon" loading="eager"/>
            </div>
            <div className="singleFoodItemPopupContainerCenter">
                <div className="singleFoodItemPopupName">{props.itemData.name}</div>
                <div className="singleFoodItemPopupDescription">{props.itemData.description}</div>
                <div className="singleFoodItemPopupPrice">{props.itemData.price}€</div>
            </div>
            <div className="singleFoodItemPopupContainerBottom">
                <div className="singleFoodItemPopupQuantity">
                    <img className="singleFoodItemPopupQuantityButtonMinus" src={Minus} alt="-" onClick={() => switchQuantity("-")} />
                    <div className="singleFoodItemPopupQuantityNumber">{ quantity }</div>
                    <img className="singleFoodItemPopupQuantityButtonPlus" src={Plus} alt="+" onClick={() => switchQuantity("+")} />
                </div>
                <div className="singleFoodItemPopupAddToCart" onClick={() => HandleItemOperation()}>
                    <div id="addToCartBtnText">Add to cart</div>
                    <div>{ (quantity*props.itemData.price).toFixed(2) }€</div>
                </div>
            </div>
        </div>
    )
};

export default SingleFoodItem;