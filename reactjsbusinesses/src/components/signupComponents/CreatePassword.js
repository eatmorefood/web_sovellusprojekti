import React from "react";
import { useEffect } from 'react';
import '../customerAuth/Signup.css';
import eye_open from '../../images/password_eye.png';
import eye_closed from '../../images/password_eye_closed.png';

//This is part 3/4 of the multiphase signup form
const CreatePassword = ({ handleSignup, handleChange, values }) => {

    useEffect(() => { //automatically scrolls to the top of the page, useful for mobile users
        window.scrollTo(0, 0)
      }, []);

    useEffect(() => {
        //code inside this useEffect is for helping the customer to create a strong password by..
        //..forcing the password to comply with certain rules

        //password validation effect taken from https://www.w3schools.com/howto/howto_js_password_validation.asp
        
        let elem  = document.getElementById("signupPassword")
        var letter = document.getElementById("letter");
        var capital = document.getElementById("capital");
        var number = document.getElementById("number");
        var length = document.getElementById("length");

        elem.onkeyup = function() {
            // Validate lowercase letters
            var lowerCaseLetters = /[a-ö]/g;
            if(elem.value.match(lowerCaseLetters)) {  
                letter.classList.remove("invalid");
                letter.classList.add("valid");
            } else {
                letter.classList.remove("valid");
                letter.classList.add("invalid");
            }
                
            // Validate capital letters
            var upperCaseLetters = /[A-Z]/g;
            if(elem.value.match(upperCaseLetters)) {  
                capital.classList.remove("invalid");
                capital.classList.add("valid");
            } else {
                capital.classList.remove("valid");
                capital.classList.add("invalid");
            }
            
            // Validate numbers
            var numbers = /[0-9]/g;
            if(elem.value.match(numbers)) {  
                number.classList.remove("invalid");
                number.classList.add("valid");
            } else {
                number.classList.remove("valid");
                number.classList.add("invalid");
            }
            
            // Validate length
            if(elem.value.length >= 6) {
                length.classList.remove("invalid");
                length.classList.add("valid");
            } else {
                length.classList.remove("valid");
                length.classList.add("invalid");
            }

            //if all required features exist in password, then hide info box
            if(letter.classList.contains("valid") && capital.classList.contains("valid") &&
                number.classList.contains("valid") &&length.classList.contains("valid")){
                document.getElementById("passwordCreatingTip").style.display = "none";
                document.getElementById("signupSubmit").style.display = "block";
            } else {
                document.getElementById("passwordCreatingTip").style.display = "block";
                document.getElementById("signupSubmit").style.display = "none";
            }
        }

        let eye = document.getElementById("passwordEye");
        let inputField = document.getElementById("signupPassword");
        
        eye.addEventListener("mousedown", handleMouseDown); //add event listener for eye icon (next to password input field)
        window.addEventListener("mouseup", handleMouseUp); //add another listener for whole window to see when mouse is button released

        function handleMouseDown() { //when mouse button pressed, switch eye image and show password field content as text
            eye.src = eye_open;
            inputField.type = "text";  
        };

        function handleMouseUp() { //when mouse button released, switch eye image to original and hide password
            eye.src = eye_closed;
            inputField.type = "password";
        }
    })

    return (
        <div className="Signup">
            <div className="signupContent">
                <div className="signupTitle">Almost ready!</div>
                <div className="signupSubTitle">Now you just need a password.</div>

                    <form className="passwordForm">
                    <input
                        type="password"
                        id="signupPassword"
                        name="password"
                        placeholder="create password"
                        onChange={handleChange('password')}
                        defaultValue={values.password}
                        autoComplete="off"
                        maxLength="30"
                    />
                    <img id="passwordEye" src={ eye_closed } alt="show" />
                </form>
                <p className="signupDisclaimer">By creating an account you assure that all the information you gave is real and you accept our <a href="/disclaimer" target="_blank" rel="noopener noreferrer">Disclaimer</a>.
                </p>

                <div id="passwordCreatingTip">
                    <h4>Your password must contain:</h4>
                    <p id="letter" className="invalid">A <b>lowercase</b> letter</p>
                    <p id="capital" className="invalid">A <b>capital (uppercase)</b> letter</p>
                    <p id="number" className="invalid">A <b>number</b></p>
                    <p id="length" className="invalid">Minimum <b>6 characters</b></p>
                </div>
                <button id="signupSubmit" onClick={ handleSignup }>Create an account</button>
            </div>
        </div>
    );
}

export default CreatePassword;