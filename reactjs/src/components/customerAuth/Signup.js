import React from "react";
import axios from 'axios';
import './Signup.css';
import UserDetails from '../signupComponents/UserDetails.js';
import Confirmation from '../signupComponents/Confirmation.js';
import CreatePassword from '../signupComponents/CreatePassword.js';
import Success from '../signupComponents/Success.js';
import Constants from '../../Constants.json';

//This is the main "controller" and body of the multiphase signup form
export default class Signup extends React.Component {

  state = {
    jwt: null,
    step: 1,
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    password:""
  }

  prevStep = () => {  //go back to previous step
    let { step } = this.state;
    this.setState({ step: step - 1 });
  }

  nextStep = () => {  //proceed to the next step
    let { step } = this.state;
    this.setState({ step: step + 1 });
  }

  handleChange = input => e => {   //Handle fields change
    this.setState({ [input]: e.target.value });
  }

  handleSignup = async (event) => {
    this.setState({ step: 4 }); //switches to processing view

    event.preventDefault();
    try {
      
      await axios.post(Constants.API_ADDRESS + "/signup",
      {
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email.toLowerCase(),
        phone: this.state.phone,
        address: this.state.address,
        password: this.state.password
      });

      try {
        const saveUserData = await axios.post(Constants.API_ADDRESS + "/jwtLogin",
        null,
        {
          auth: {
            username: this.state.email.toLowerCase(),
            password: this.state.password
          }
        });

        this.state.jwt = saveUserData.data.jwt;
        this.setState({ step: 5 })
      } catch (e) {
        this.setState({ step: 1 })
        alert("Failed to login after account creation");
      }
    } catch(error) {
      this.setState({ step: 1 })
      alert("Account creation failed, please try again :/");
    }
  }

  render() {
    const { step } = this.state;
    const { fname, lname, email, phone, address, password } = this.state;
    const values = { fname, lname, email, phone, address, password };
    
    switch(step) {
      case 1: 
        return (
          <UserDetails
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            values={ values }
          />
        )
      case 2: 
        return (
          <Confirmation 
            prevStep={ this.prevStep }
            nextStep={ this.nextStep }
            values={ values }
          />
        )
      case 3: 
        return (
          <CreatePassword
            prevStep={ this.prevStep }
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            handleSignup={ this.handleSignup }
            values={ values }
          />
        )
      case 4: 
        return (
          <div className="processingSignup">
            <h2>Creating account</h2>
            <div>Please wait... &#9749;</div>
            <div className="processRoller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
        )
      case 5: 
      return (
        <Success logMeIn = {() => this.props.login(this.state.jwt) }/>
      )
      default: 
          //do nothing
    }
  }
}