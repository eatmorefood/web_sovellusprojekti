import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import './Checkout.css';
import DeliveryImg from '../../images/delivery.jpg';
import PlusBtn from '../../images/plus.png';

function Checkout(props) {
  let navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState(null);
  let restaurant = JSON.parse(props.restaurantData);

  console.log(decodedToken)

  useEffect(() => {
    if(!props.jwt){
      navigate('/');
    } else {
      setDecodedToken(jwt_decode(props.jwt));
      console.log("else")
    }
  }, [props.jwt, navigate])

  const getSubtotal = () => {
    let subtotal = 0;
    for (let i = 0; i < props.cart.length; i++) {
      subtotal += props.cart[i].singlePrice*props.cart[i].qty;
    }
    return subtotal.toFixed(2);
  }

  const totalQty = () => {
    const x = props.cart.reduce(function(prev, cur) { //calculate total quantity of cart items
        return prev + cur.qty;
    }, 0);
    return x;
} 

  const getTotalSum = () => { //calculate total cart sum
    let totalSum = 0;
    for (let i = 0; i < props.cart.length; i++) {
      totalSum += props.cart[i].singlePrice*props.cart[i].qty;
    }
    totalSum += 5.3;
    return totalSum.toFixed(2);
  };

  const itemCountText = () => {
    if(totalQty === 0){
      return 'item';
    } else {
      return 'items';
    }
  }

console.log(props.cart)

  return (
    <div className="Checkout">
      <img className="checkoutImage" src={DeliveryImg} alt="no img"/>
      <div className="checkoutContainer">
        <div className="checkoutGoBackBtn" onClick={() => navigate(-1)}>&#129048; Go back</div>
        <div className="checkoutTitleContainer">
          <div>Your order</div>
          <div className="checkoutRestaurantName">{restaurant[0].name}</div>
        </div>
        <div className="checkoutContentContainer">

          <div className="checkoutContainerLeft">
            <div className="checkoutDeliveryContainer">
              <div className="checkoutContainerLeftTitle">Delivery address</div>
              <div className="checkoutDeliveryContainerAddress">Address</div>
            </div>
            <div className="checkoutProductContainer">
              <div className="checkoutContainerLeftTitle">Your products</div>
              <div className="checkoutProductListContainer">
                {
                  props.cart.map((product) =>
                    <div className="checkoutProductItem" key={product.id}>
                      <div className="checkoutProductItemName"><span className="checkoutProductItemQty">{product.qty}x</span> {product.name}</div>
                      <div className="checkoutProductItemDescription">{product.description}</div>
                      <div className="checkoutProductItemPrice">{(product.singlePrice*product.qty).toFixed(2)} €</div>
                    </div>
                  )
                }
                <div className="checkoutProductListEdit" onClick={() => navigate(-1)}>
                  <img src={PlusBtn} alt="+" height="30"/>
                  <div>Add products</div>
                </div>
              </div>
            </div>
          </div>

          <div className="checkoutContainerRight">
            <div className="checkoutContainerRightTitle">Price in currency EUR</div>
            <div className="checkoutContainerRightTextFlex">
              <div>Subtotal ({totalQty()} {itemCountText()})</div>
              <div>{getSubtotal()} €</div>
            </div>
            <div className="checkoutContainerRightTextFlex">
              <div>Delivery</div>
              <div>5.00 €</div>
            </div>
            <div className="checkoutContainerRightTextFlex">
              <div>Service fee</div>
              <div>0.30 €</div>
            </div>
            <div className="checkoutContainerRightTextFlex">
            <div className="checkoutContainerRightTotalSum">Total cost</div>
              <div className="checkoutContainerRightTotalSum">{getTotalSum()}€</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;