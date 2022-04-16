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
    email: "",
    name: "",
    address: "",
    open: "",
    type: "",
    pricelevel: "",
    image: "",
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

  handleImageChange = input => e => {
    this.setState({ [input]: e.target.files[0]});
    this.setState({ ["tempImage"]: (URL.createObjectURL(e.target.files[0]))});
  }

  handleSignup = async (event) => {
    this.setState({ step: 4 }); //switches to processing view

    event.preventDefault();
    //console.log(event);
    try {
      const signUpResult = await axios.post(Constants.API_ADDRESS + "/signupbusiness",
      {
        email: this.state.email,
        name: this.state.name,
        address: this.state.address,
        open: this.state.open,
        type: this.state.type,
        pricelevel: this.state.pricelevel,
        password: this.state.password
      });

      //console.log(result);
      try {
        const saveUserData = await axios.post(Constants.API_ADDRESS + "/jwtBusinessLogin",
        null,
        {
          auth: {
            username: this.state.email,
            password: this.state.password
          }
        });

        if(this.state.image && signUpResult.data.id)
        {
          console.log("Update image");
          const data = new FormData();
          data.append('file', this.state.image);
          data.append('id', signUpResult.data.id);
          var result = await axios.put(Constants.API_ADDRESS + "/restaurant/imageupload",
            data
          );
        }

        //console.log(saveUserData); //do something with the result
        this.state.jwt = saveUserData.data.jwt;
        this.setState({ step: 5 })
    } catch (e) {
      this.setState({ step: 1 })
      alert("Account creation failed, please try again :/");
    }
    } catch(error) {
      //console.log(error);
      this.setState({ step: 1 })
      alert("Account creation failed, please try again :/");
    }
  }

  render() {
    const { step } = this.state;
    const { name, open, email, type, pricelevel, address, image, tempImage, password } = this.state;
    const values = { name, open, email, type, pricelevel, address, image, tempImage, password };
    
    switch(step) {
      case 1: 
        return (
          <UserDetails
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            handleImageChange={this.handleImageChange}
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