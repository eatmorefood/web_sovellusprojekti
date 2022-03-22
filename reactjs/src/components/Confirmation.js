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
                    <div>{values.fname}</div>
                    <p>Last name</p>
                    <div>{values.lname}</div>
                    <p>Email address</p>
                    <div>{values.email}</div>
                    <p>Phone number</p>
                    <div>{values.phone}</div>
                    <p>Street address</p>
                    <div>{values.address}</div>
                </div>
                <div className="confirmationBtns">
                    <button id="confirmPrev" className="multiphaseFormBtn" onClick={ () => prevStep() }>Go back</button>
                    <button id="confirmNext" className="multiphaseFormBtn" onClick={ () => nextStep() }>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default Confirmation;