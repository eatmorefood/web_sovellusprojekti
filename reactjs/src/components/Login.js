import React from "react";
import './Login.css';
import closeBtn from '../images/closeBtnCircle.png';

function Login( {displayLogin} ){

  return (
    <div className="Login animateLoginZoom">
      <img className="closeLogin" src={closeBtn} onClick={ displayLogin } alt="x" />
      <div className="loginContent">
        <div className="loginTitle">Log in or create account</div>
        <div className="loginSubTitle">Log in below or create a new EatMoreFood account.</div>
        <form method="post" className="loginForm">
          <input
            type="email"
            className="loginEmail"
            name="email"
            placeholder="email"
            autoComplete="off"
          />
          <input
            type="password"
            className="loginPassword"
            name="password"
            placeholder="password"
            autoComplete="off"
          />
          <input
            type="submit"
            className="loginSubmit"
            value="Log in"
          />
          <div className="loginMiddleText">OR</div>
          <button className="loginBtnRegister" onClick={(e) => { e.preventDefault(); window.location.href='/signup'; }}>Sign up</button>
      </form>  
      </div>
    </div>
  );
}

export default Login;