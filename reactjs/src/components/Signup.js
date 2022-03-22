import React, { Component } from "react";
import './Signup.css';
import UserDetails from './UserDetails.js';
import Confirmation from './Confirmation.js';
import CreatePassword from './CreatePassword.js';
import Success from './Success.js';

//This is the main "controller" and body of the multiphase signup form
export default class Signup extends Component{

  state = {
    step: 1,
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    password:"",
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

  validateSignup = input => e => {   //Handle fields change
    this.setState({ [input]: e.target.value });
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
            validateSignup={ this.validateSignup }
            values={ values }
          />
        )
        case 4: 
          return (
            <Success />
          )
      default: 
          //do nothing
    }
  }
}