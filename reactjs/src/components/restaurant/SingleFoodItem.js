import React from 'react';
import './SingleFoodItem.css';
import CloseSingleItemPopup from '../../images/closeBtnCircle.png';

function SingleFoodItem(props){ //displays single restaurant food item

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
                    <div className="singleFoodItemPopupQuantityButton">-</div>
                    <div className="singleFoodItemPopupQuantityNumber">10</div>
                    <div className="singleFoodItemPopupQuantityButton">+</div>
                </div>
                <div className="singleFoodItemPopupAddToCart">
                    <div>Add to cart</div>
                    <div>15.00$</div>
                </div>
            </div>
        </div>
    )
};

export default SingleFoodItem;