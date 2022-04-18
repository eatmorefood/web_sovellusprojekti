import React from 'react';
import './Login.css';
import axios from 'axios';
import closeBtn from '../../images/closeBtnCircle.png';
import Constants from '../../Constants.json';
import { useNavigate } from "react-router-dom";

function Login( props ){ 
  let navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(Constants.API_ADDRESS + "/jwtBusinessLogin",
      null,
      {
        auth: {
          username: event.target.email.value,
          password: event.target.password.value
        }
      });
      if(window.location.pathname.indexOf("business/signup") > -1){
        navigate('/business');
      }
      const receivedJWT = result.data.jwt;
      props.login(receivedJWT);

    } catch(error) {
      var body = document.getElementById("loginErrorMessage");
      var x = document.getElementById("loginEmail");      
      var y = document.getElementById("loginPassword");
      body.style.visibility = "visible";
      x.style.borderColor = "red";
      x.value = "";
      y.style.borderColor = "red";
      y.value = "";
      setTimeout(function() {
        body.style.visibility = "hidden";
        x.style.borderColor = "lightgrey";
        y.style.borderColor = "lightgrey";
      }, 5000);
    }
    
  }

  return (
    <div className="Login animateLoginZoom">
      <img className="closeLogin" src={closeBtn} onClick={ props.displayLogin } alt="x" />
      <div className="loginContent">
        <div className="loginTitleWarning">THIS LOGIN IS BUSINESS ONLY</div>
        <div className="loginTitle">Log in or create account <br></br> for your business.</div>
        <div className="loginSubTitle">Log in below or create a new EatMoreFood <br></br> account for your business.</div>
        <div id="loginErrorMessage">Wrong email or password!</div>
        <form className="loginForm" onSubmit={ handleLoginSubmit }>
          <input
            type="email"
            id="loginEmail"
            name="email"
            placeholder="email"
            autoComplete="off"
            required
          />
          <input
            type="password"
            id="loginPassword"
            name="password"
            placeholder="password"
            autoComplete="off"
            required
          />
          <input
            type="submit"
            className="loginSubmit"
            value="Log in"
          />
          <div className="loginMiddleText">OR</div>
          <button className="loginBtnRegister" onClick={(e) => { e.preventDefault(); window.location.href='/business/signup'; }}>Sign up</button>
      </form>  
      </div>
    </div>
  );
}

export default Login;