import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './Checkout.css';
import DeliveryImg from '../../images/delivery.jpg';
import PlusBtn from '../../images/plus.png';
import arrowDown from '../../images/down-arrow.png';
import CheckoutAuth from '../customerAuth/CheckoutAuth.js';
import axios from 'axios';
import Constants from '../../Constants.json';

function Checkout(props) {
  let navigate = useNavigate();
  let authScreen = <></>;
  
  const ref = useRef() 
  const [addressInput, setAddressInput] = useState('');
  const [addressOption, setAddressOption] = useState(1);
  let [addressCollapse, setAddressCollapse] = useState(false);
  let [paymentCollapse, setPaymentCollapse] = useState(false);
  let [cartFromBrowser, setCartFromBrowser] = useState([]);
  let [restData, setRestData] = useState([]);
  const [authVisible, setAuthVisible] = useState(false);
  const [successfullPayment, setSuccessfullPayment] = useState(null);

  useEffect(() => {
    let importCartFromBrowser = window.localStorage.getItem('cart');
    if(importCartFromBrowser){
        let x = JSON.parse(importCartFromBrowser);
        setCartFromBrowser(x.basket);
        setRestData(x.restaurant)
        props.setRestaurantName(x.restaurant.name);
      if(document.URL.split('/').slice(-2)[0] !== x.restaurant.id){
        window.localStorage.removeItem('cart');
        navigate('restaurant/' + document.URL.split('/').slice(-2)[0]);
      }
    } else {
      navigate('/');
    }
  }, [])

  const getSubtotal = () => {
    let subtotal = 0;
    for (let i = 0; i < cartFromBrowser.length; i++) {
      subtotal += cartFromBrowser[i].singlePrice*cartFromBrowser[i].qty;
    }
    return subtotal.toFixed(2);    
  }

  const totalQty = () => {
    const x = cartFromBrowser.reduce(function(prev, cur) { //calculate total quantity of cart items
        return prev + cur.qty;
    }, 0);
    return x;
} 

  const getTotalSum = () => { //calculate total cart sum
    let totalSum = 0;
    for (let i = 0; i < cartFromBrowser.length; i++) {
      totalSum += cartFromBrowser[i].singlePrice*cartFromBrowser[i].qty;
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

  const getName = () => {
    if(props.restaurantName){
      return props.restaurantName;
    }    
  }

  function HandleCollapseClick(){
    setAddressCollapse(!addressCollapse);
    const btn = document.getElementById("checkoutDeliveryContainerAddress");
    const collapse = document.getElementById("checkoutDeliveryContainerAddressCollapse");
    const arr = document.getElementById("checkoutArrow");
    if(addressCollapse === true){
      collapse.style.display = 'block';
      btn.style.borderBottomLeftRadius = "0";
      btn.style.borderBottomRightRadius = "0";
      arr.style.transform = "rotateX(180deg)"
    } else {
      collapse.style.display = 'none';
      btn.style.removeProperty("border-bottom-left-radius");
      btn.style.removeProperty("border-bottom-right-radius");
      arr.style.removeProperty("transform");
    }
  }

  const getAddress = () => {
    if(props.customerData){
      return props.customerData.address;
    }
  }

  const getCustID = () => {
    if(props.decodedToken.user.id){
      return props.decodedToken.user.id;
    }
  }
  function HandleAddressChange(param){
    const input = document.getElementById("checkoutuDeliveryNewAddressInput");
    const addressDisplayed = document.getElementById("checkoutDeliveryContainerAddress");
    if(param === 1){
      setAddressOption(1);
      input.style.display = "none";
      addressDisplayed.innerHTML = getAddress();
    } else if(param === 2){
      setAddressOption(2);
      input.style.display = "block";
      addressDisplayed.innerHTML = "Enter new address below";
    }
  }

  const handleAddressInputChange = (params) => {
    const addressDisplayed = document.getElementById("checkoutDeliveryContainerAddress");
    setAddressInput(params);
    addressDisplayed.innerHTML = params;
  }

  function HandlePaymentCollapseClick(){
    setPaymentCollapse(!paymentCollapse);
    const btn = document.getElementById("checkoutPaymentContainerBox");
    const collapse = document.getElementById("checkoutPaymentContainerCollapse");
    const arr = document.getElementById("checkoutPaymentArrow");    
    if(paymentCollapse === true){
      collapse.style.display = 'block';
      btn.style.borderBottomLeftRadius = "0";
      btn.style.borderBottomRightRadius = "0";
      arr.style.transform = "rotateX(180deg)"
    } else {
      collapse.style.display = 'none';
      btn.style.removeProperty("border-bottom-left-radius");
      btn.style.removeProperty("border-bottom-right-radius");
      arr.style.removeProperty("transform");
    }
  }

  if(authVisible === false){
    authScreen = <></>;
  } else if(authVisible === true) { //login screen visible, displayLogin = button in login screen to close itself
    authScreen = <CheckoutAuth displayAuthScreen={ toggleAuthScreen } success={ setSuccessfullPayment } />;
  }

  function toggleAuthScreen() { //function to switch login screen visibility status
    setAuthVisible(!authVisible);
  }

  useEffect(() => {
    const checkIfClickedOutside = e => {
      //if the login screen is open and user clicks outside the login screen, then close the login screen
      if (!ref.current.contains(e.target) && !e.target.matches('#checkoutContainerRightPayment')){
        setAuthVisible(false);
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      //cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    }
  }, [authVisible]);

  useEffect(() => {
    const app = document.getElementById("Checkout");
    let a = document.getElementById("header");
    let b = document.getElementById("footer");
    if(authVisible === true) {
      app.style.filter = "blur(8px)";
      app.style.pointerEvents = "none";
      a.style.filter = "blur(10px)";
      a.style.pointerEvents = "none";
      b.style.filter = "blur(10px)";
      b.style.pointerEvents = "none";
      document.body.style.overflow = "hidden";
      
    } else if(authVisible === false) {
      app.style.filter = "none";
      app.style.pointerEvents = "all";
      a.style.filter = "none";
      a.style.pointerEvents = "all";
      b.style.filter = "none";
      b.style.pointerEvents = "all"; 
      document.body.style.removeProperty("overflow"); 
    }
  }, [authVisible]);

  const getFinalAddress = () => {
    if(addressOption === 1){
      return getAddress();
    } else if (addressOption === 2){
      return addressInput;
    }
  }

  useEffect(() => {
    if(successfullPayment !== null){
      const createPurchaseRecord = async () => {    
          try {
            let mapFoodId = cartFromBrowser.map(({id}) => id);
            let mappedFoodId = JSON.stringify(mapFoodId)

            const results = await axios.post(Constants.API_ADDRESS + '/customer/purchase',
            {
              restID: restData.id,
              custID: getCustID(),
              total: getTotalSum(),
              foodID: mappedFoodId,
              address: getFinalAddress()
            })
            setAuthVisible(false);
            alert("Purchase successful!")
            window.localStorage.removeItem('cart');
            navigate('/');
          } catch(error) {
              console.log("something went wrong");
          }
      }
      createPurchaseRecord();
    }
    setSuccessfullPayment(null);
  }, [successfullPayment])

  return (
    <>
    <div id="checkoutAuthMain" ref={ref}>
        { authScreen }
      </div>
    <div id="Checkout">
      <img className="checkoutImage" src={DeliveryImg} alt="no img"/>
      <div className="checkoutContainer">
        <div className="checkoutGoBackBtn" onClick={() => navigate(-1)}>&#129048; Go back</div>
        <div className="checkoutTitleContainer">
          <div>Your order</div>
          <div className="checkoutRestaurantName">{getName()}</div>
        </div>
        <div className="checkoutContentContainer">
          <div className="checkoutContainerLeft">
            <div className="checkoutDeliveryContainer">
              <div className="checkoutContainerLeftTitle">Delivery address</div>
              <button id="checkoutDeliveryContainerAddress" onClick={() => HandleCollapseClick()}>{getAddress()}
                <img id="checkoutArrow" src={arrowDown} alt="&#11167;" />
              </button>
              <div id="checkoutDeliveryContainerAddressCollapse">
                <div><input type="radio"
                            className="checkoutRadioBtnOption"
                            name="address"
                            value="old"
                            onClick={() => HandleAddressChange(1)}
                            defaultChecked
                            /> {getAddress()}
                </div>
                <div><input type="radio"
                            className="checkoutRadioBtnOption"
                            name="address"
                            value="new"
                            onClick={() => HandleAddressChange(2)}                            
                            /> Another address
                            <div id="checkoutuDeliveryNewAddressInput">
                              <label htmlFor="newAddress">Enter a new address: </label><br></br>
                              <input type="text"
                                     className="checkoutRadioBtnOption"
                                     id="newDeeliveryAddressInput"
                                     name="newAddress"
                                     value={addressInput}
                                     onChange={e => handleAddressInputChange(e.target.value)}
                                     autoComplete="off"/>
                            </div>
              </div>
              </div>
            </div>
            <div className="checkoutProductContainer">
              <div className="checkoutContainerLeftTitle">Your products</div>
              <div className="checkoutProductListContainer">
                {
                  cartFromBrowser.map((product) =>
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

            <div className="checkoutPaymentContainer">
              <div className="checkoutContainerLeftTitle">Payment method</div>
              <button id="checkoutPaymentContainerBox" onClick={() => HandlePaymentCollapseClick()}>Login credentials
                <img id="checkoutPaymentArrow" src={arrowDown} alt="&#11167;"/>
              </button>
              <div id="checkoutPaymentContainerCollapse">
                <div><input type="radio"
                            name="paymentMethod"
                            value="default"
                            defaultChecked
                            /> Login Credentials
                </div>
              </div>
            </div>
          </div>

          <div className="checkoutContainerCenter"></div>

          <div className="checkoutContainerRight">
            <div className="checkoutContainerRightBox">
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
              <div id="checkoutContainerRightPayment" onClick={() => setAuthVisible(!authVisible)}>Proceed to payment</div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}

export default Checkout;