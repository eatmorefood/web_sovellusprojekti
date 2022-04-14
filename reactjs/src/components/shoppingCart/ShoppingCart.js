import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ShoppingCart.css';
import CloseCartPopup from '../../images/closeBtnCircle.png';
import Minus from '../../images/minus.png';
import Plus from '../../images/plus.png';
import Trashcan from '../../images/trashcan.png';

function ShoppingCart(props){ //displays shopping cart popup
    let [itemSwitchQty, setItemSwitchQty] = useState(false);
    const location = useLocation();

    const reduceQuantity = (item) => { //handle quantity adjustment
        if(item.qty > 1){
            let updatedProd = {
                id: item.id,
                qty: item.qty - 1
            }
            props.modifyQty(updatedProd);
        } else if(item.qty === 1){
            props.removeCartItem(item.id);
        }      
    };

    const addQuantity = (item) => { //handle quantity adjustment
        if(item.qty < 100){
            let updatedProd = {
                id: item.id,
                qty: item.qty + 1
            }
            props.modifyQty(updatedProd);
        }
    };

    function CloseCart(){
        document.body.style.removeProperty("overflow"); 
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

    return (    
        <div className="shoppingCartPopupContainer">
            <div className="shoppingCartPopupContainerTop">
                <img className="shoppingCartPopupCloseBtn" src={CloseCartPopup} onClick={props.closeBtn} alt="x" />
                <div className="shoppingCartPopupTitle" >Your order</div>
            </div>
            <div className="shoppingCartPopupContainerCenter">
                {props.cart.map((item) => (
                    <div className="shoppingCartItemBox" key={item.id}>
                        <div>
                            <div>{
                                itemSwitchQty ?
                                <div className="shoppingCartItemQtySwitch">
                                    <img className="singleFoodItemPopupQuantityButtonMinus" src={Minus} alt="-" onClick={() => reduceQuantity(item)} />
                                    <div className="singleFoodItemPopupQuantityNumber">{ item.qty }</div>
                                    <img className="singleFoodItemPopupQuantityButtonPlus" src={Plus} alt="+" onClick={() => addQuantity(item)} />
                                    <img className="singleFoodItemPopupQuantityButtonRemove" src={Trashcan} alt="delete" onClick={() => props.removeCartItem(item.id)} />
                                </div>
                                :
                                <div className="shoppingCartItemQty" onClick={() => setItemSwitchQty(!itemSwitchQty)}>{item.qty}</div>
                            }</div>
                        </div>
                        <div className="shoppingCartItemBoxRight" onClick={() => setItemSwitchQty(!itemSwitchQty)}>
                            <div className="shoppingCartItemBoxRightName">{item.name}</div>
                            <div className="shoppingCartItemBoxRightPrice">{(item.qty*item.singlePrice).toFixed(2)}€</div>
                        </div>                        
                    </div>
                ))}
            </div>
            <Link to={location.pathname + "/checkout"} style={{ textDecoration: 'none' }} >
                <div className="shoppingCartProceedToCheckout" onClick={() => CloseCart()}>
                    <div className="shoppingCartProceedToCheckoutLeft">
                        <div className="shoppingCartTotalItemNumber">{props.totalQty}</div>
                        <div>Proceed to checkout</div>
                    </div>
                    <div className="shoppingCartProceedToCheckoutRight">
                        <div>{props.totalSum()}€</div>
                    </div>
                </div>
            </Link>
        </div>
    )
};

export default ShoppingCart;