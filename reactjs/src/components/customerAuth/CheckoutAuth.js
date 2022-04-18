import React from 'react';
import './CheckoutAuth.css';
import axios from 'axios';
import closeBtn from '../../images/closeBtnCircle.png';
import Constants from '../../Constants.json';
import { useNavigate } from "react-router-dom";

function CheckoutAuth( props ){ 
  let navigate = useNavigate();

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(Constants.API_ADDRESS + "/jwtLogin",
      null,
      {
        auth: {
          username: event.target.checkoutAuthEmail.value.toLowerCase(),
          password: event.target.checkoutAuthPassword.value
        }
      });
      /*if(window.location.pathname.indexOf("signup") > -1){
        navigate('/');
      }*/
      const receivedJWT = result.data.jwt;
      props.success(receivedJWT);

    } catch(error) {
      var q = document.getElementById("checkoutAuthErrorMessage");
      var x = document.getElementById("checkoutAuthEmail");      
      var y = document.getElementById("checkoutAuthPassword");
      q.style.visibility = "visible";
      x.style.borderColor = "red";
      x.value = "";
      y.style.borderColor = "red";
      y.value = "";
      setTimeout(function() {
        q.style.visibility = "hidden";
        x.style.borderColor = "lightgrey";
        y.style.borderColor = "lightgrey";
      }, 5000);
    }
    
  }

  return (
    <div className="CheckoutAuth">
      <img className="closeCheckoutAuthPopup" src={closeBtn} onClick={ props.displayAuthScreen } alt="x" />
      <div className="checkoutAuthContent">
        <div className="checkoutAuthTitle">Payment validation</div>
        <div className="checkoutAuthSubTitle">Enter login credentials to validate payment</div>
        <div id="checkoutAuthErrorMessage">Wrong email or password!</div>
        <form className="checkoutAuthForm" onSubmit={ handleAuthSubmit }>
          <input
            type="email"
            id="checkoutAuthEmail"
            name="checkoutAuthEmail"
            placeholder="email"
            autoComplete="off"
            required
          />
          <input
            type="password"
            id="checkoutAuthPassword"
            name="checkoutAuthPassword"
            placeholder="password"
            autoComplete="off"
            required
          />
          <input
            type="submit"
            className="checkoutAuthSubmit"
            value="Pay"
          />
      </form>  
      </div>
    </div>
  );
}

export default CheckoutAuth;