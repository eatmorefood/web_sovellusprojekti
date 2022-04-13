import React, { useState } from 'react';
import './ShoppingCart.css';
import CloseCartPopup from '../../images/closeBtnCircle.png';
import Minus from '../../images/minus.png';
import Plus from '../../images/plus.png';
import Trashcan from '../../images/trashcan.png';

function ShoppingCart(props){ //displays shopping cart popup
    let [itemSwitchQty, setItemSwitchQty] = useState(false);

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
            <div className="shoppingCartProceedToCheckout">
                <div className="shoppingCartProceedToCheckoutLeft">
                    <div className="shoppingCartTotalItemNumber">{props.totalQty}</div>
                    <div>Proceed to checkout</div>
                </div>
                <div className="shoppingCartProceedToCheckoutRight">
                    <div>{props.totalSum()}€</div>
                </div>
            </div>
        </div>
    )
};

export default ShoppingCart;