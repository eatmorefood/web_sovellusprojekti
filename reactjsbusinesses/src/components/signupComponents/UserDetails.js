import React, { useEffect } from 'react'
import '../customerAuth/Signup.css';

//This is part 1/4 of the multiphase signup form
const UserDetails = ({ nextStep, handleChange, values, handleImageChange }) => {

    useEffect(() => { //automatically scrolls to the top of the page, useful for mobile users
        window.scrollTo(0, 0)
      }, []);

  return (
    <div className="Signup">
        <div className="signupContent">
            <div className="signupTitle">Hello! Nice to meet you &#128516;</div>
            <div className="signupSubTitle">Create a new EatMoreFood account for a business below. <br/>After the process your information will be automatically checked.</div>
            <form className="signupForm" onSubmit={ nextStep }>
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
                <div className="signupInputTitle">Restaurant name:</div>
                <input
                    type="text"
                    className="signupField"
                    name="name"
                    placeholder="restaurant name"
                    onChange={handleChange('name')}
                    defaultValue={values.name}
                    autoComplete="off"
                    maxLength="40"
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
                <div className="signupInputTitle">Open: (example: 10-21)</div>
                <input
                    type="text"
                    className="signupField"
                    name="open"
                    placeholder="open"
                    onChange={handleChange('open')}
                    defaultValue={values.open}
                    autoComplete="off"
                    maxLength="5"
                    required
                />
                <div className="signupInputTitle">Type:</div>
                <input
                    type="text"
                    className="signupField"
                    name="type"
                    placeholder="type"
                    onChange={handleChange('type')}
                    defaultValue={values.type}
                    autoComplete="off"
                    maxLength="35"
                    required
                />
                <div className="signupInputTitle">Price level: (only € marks. Choose between € and €€€€)</div>
                <input
                    type="text"
                    className="signupField"
                    name="pricelevel"
                    placeholder="price level"
                    onChange={handleChange('pricelevel')}
                    defaultValue={values.pricelevel}
                    autoComplete="off"
                    pattern="[€]"
                    title="Max 4 letter price level"
                    maxLength="4"
                    required
                />
                <div className="signupInputTitle">Image:</div>
                <input
                    type="file"
                    className="signupField"
                    name="image"
                    placeholder="image"
                    onChange={handleImageChange('image')}
                    autoComplete="off"
                />
                <button value="submit" className="multiphaseFormBtn">Next</button>
            </form>

        </div>
    </div>
  )
}

export default UserDetails;