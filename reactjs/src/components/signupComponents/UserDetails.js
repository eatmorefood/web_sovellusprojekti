import React, { useEffect } from 'react'
import '../customerAuth/Signup.css';

//This is part 1/4 of the multiphase signup form
const UserDetails = ({ nextStep, handleChange, values }) => {

    useEffect(() => { //automatically scrolls to the top of the page, useful for mobile users
        window.scrollTo(0, 0)
      }, []);

  return (
    <div className="Signup">
        <div className="signupContent">
            <div className="signupTitle">Hello! Nice to meet you &#128516;</div>
            <div className="signupSubTitle">Create a new EatMoreFood account below.</div>
            <form className="signupForm" onSubmit={ nextStep }>
                <div className="signupInputTitle">First name:</div>
                <input
                    type="text"
                    className="signupField"
                    name="fname"
                    placeholder="first name"
                    onChange={handleChange('fname')}
                    defaultValue={values.fname}
                    autoComplete="off"
                    maxLength="40"
                    required
                />
                <div className="signupInputTitle">Last name:</div>
                <input
                    type="text"
                    className="signupField"
                    name="lname"
                    placeholder="last name"
                    onChange={handleChange('lname')}
                    defaultValue={values.lname}
                    autoComplete="off"
                    maxLength="40"
                    required
                />
                <div className="signupInputTitle">Email:</div>
                <input
                    type="email"
                    className="signupField"
                    name="email"
                    placeholder="email"
                    onChange={handleChange('email')}
                    defaultValue={values.email}
                    autoComplete="off"
                    maxLength="50"
                    required
                />
                <div className="signupInputTitle">Phone number:</div>
                <input
                    type="tel"
                    onKeyPress={(event) => { //deprecated, should find another solution
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    className="signupField"
                    name="phone"
                    placeholder="mobile number"
                    onChange={handleChange('phone')}
                    defaultValue={values.phone}
                    autoComplete="off"
                    maxLength="20"
                    required
                />
                <div className="signupInputTitle">Address:</div>
                <input
                    type="text"
                    className="signupField"
                    name="address"
                    placeholder="street address"
                    onChange={handleChange('address')}
                    defaultValue={values.address}
                    autoComplete="off"
                    maxLength="35"
                    required
                />
                <button value="submit" className="multiphaseFormBtn">Next</button>
            </form>

        </div>
    </div>
  )
}

export default UserDetails;