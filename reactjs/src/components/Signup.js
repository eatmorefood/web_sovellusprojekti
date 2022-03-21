import React from "react";
import './Signup.css';

function Signup( ){
  

  return (
    <div className="Signup">
      <div className="signupContent">
        <div className="signupTitle">Hello! Nice to meet you &#128516;</div>
        <div className="signupSubTitle">Create a new EatMoreFood account below.</div>
        <form method="post" className="signupForm">
          <input type="text" className="signupField" name="fname" placeholder="first name" autoComplete="off"/>
          <input type="text" className="signupField" name="lname" placeholder="last name" autoComplete="off"/>

          <input type="text" className="signupField" name="email" placeholder="email" autoComplete="off"/>
          <input type="number" className="signupField" name="phone" placeholder="mobile number" autoComplete="off"/>
          <input type="adr" className="signupField" name="address" placeholder="street address" autoComplete="off"/>

          <input type="password" className="signupPassword" name="password" placeholder="password" autoComplete="off"/>
          <p className="signupTC">By creating an account you accept our <a className="signupTClink" href="/disclaimer" target="_blank" rel="noopener noreferrer">Disclaimer</a>.</p>
          <input type="submit" className="signupSubmit" value="Create account" />
      </form>  
      </div>
    </div>
  );
}

export default Signup;