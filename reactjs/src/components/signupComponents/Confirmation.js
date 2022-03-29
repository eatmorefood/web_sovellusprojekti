import React, { useEffect } from 'react'

//This is part 2/4 of the multiphase signup form
const Confirmation = ({ prevStep, nextStep, values }) => {

    useEffect(() => { //automatically scrolls to the top of the page, useful for mobile userss
        window.scrollTo(0, 0)
      }, []);

    return (
        <div className="Signup">
            <div className="signupContent">
                <div className="signupTitle">Confirm details</div>
                <div className="signupSubTitle">Is this information correct?</div>
                <div className="confirmationBox">
                    <p>First name</p>
                    <div className="confirmationContainer">{values.fname}</div>
                    <p>Last name</p>
                    <div className="confirmationContainer">{values.lname}</div>
                    <p>Email address</p>
                    <div className="confirmationContainer">{values.email}</div>
                    <p>Phone number</p>
                    <div className="confirmationContainer">{values.phone}</div>
                    <p>Street address</p>
                    <div className="confirmationContainer">{values.address}</div>
                </div>
                <div className="confirmationBtns">
                    <button id="confirmPrev" className="multiphaseFormBtn" onClick={ () => prevStep() }>&#11160; No, take me back</button>
                    <button id="confirmNext" className="multiphaseFormBtn" onClick={ () => nextStep() }>Yes, this is correct &#11162;</button>
                </div>
            </div>
        </div>
    )
}

export default Confirmation;