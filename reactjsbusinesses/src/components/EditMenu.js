import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './MenuPage.css';
import Constants from '../Constants.json';


function EditMenu ( props ) {
  //const EditMenu = ({ handleChange }) => {
  const [userData, setUserData] = useState([]);
  let { id } = useParams();
  //console.log(id);

    let decodedToken = "";
    let loggedInName = "";
  
    if(props.jwt != null){
    decodedToken = jwt_decode(props.jwt);
    loggedInName = decodedToken.user.name;
    }

    const handleChange = input => e => {   //Handle fields change
      //this.setUserData({ [input]: e.target.value });
      userData[input] = e.target.value;
    }
    console.log("decode");
    console.log(decodedToken);
    useEffect(() => {          

      const loadProfileDataWithJWT = async () => { //load user data to show here
        try {


            


          const results = await axios.get(Constants.API_ADDRESS + '/meal/byid/' +  id,
          {
              headers: {
                  'Authorization': 'Bearer ' + props.jwt
              }
          })
          //console.log(results.data);
          if (results.data && results.data.length > 0)
          {
          setUserData(results.data[0]);
          
          }
        } catch(error) {
          console.log(error);
            console.log("something went wrong");
        }
      }    
        if(id != "new")
      {

      loadProfileDataWithJWT();
    }
    else{
      console.log("new");
    }
    }, [props]);

    const handleSubmit = async (event) => {
      event.preventDefault();

      if(!userData.idfood)
      {
        userData.idrestaurant = decodedToken.user.id;
      }
      try {
        /*const result =*/ await axios.post(Constants.API_ADDRESS + "/meal",
        {
          idfood: userData.idfood,
          name: userData.name,
          category: userData.category,
          description: userData.description,
          price: userData.price,
          idrestaurant: userData.idrestaurant,
          image: userData.image
        });}
        catch(error){
          console.log(error);
          alert('Tallennus epäonnistui');
        }
    }

    
  return (
    <div className="menupage">
        <div>
          <h1 className="businessTitle">{loggedInName}</h1>
        </div>
        <div>This is EditMenu.js</div>
        <div className="editContent">
        <div className="editTitle">Edit your food: </div>
        <div className="editSubTitle">Click save to save the changes.</div>
        
        <form className="editForm" onSubmit={ handleSubmit }>
                <div className="editMenuTitle">Name:</div>
                <input
                    type="text"
                    className="editField"
                    name="name"
                    placeholder="name"
                    onChange={handleChange('name')}
                    defaultValue={userData.name}
                    autoComplete="off"
                    maxLength="50"
                    required
                />
                <div className="editMenuTitle">Description:</div>
                <input
                    type="text"
                    className="editFieldDesc"
                    name="description"
                    placeholder="description"
                    onChange={handleChange('description')}
                    defaultValue={userData.description}
                    autoComplete="off"
                    maxLength="50"
                    required
                />
                <div className="editMenuTitle">Category:</div>
                <input
                    type="text"
                    className="editField"
                    name="category"
                    placeholder="category"
                    onChange={handleChange('category')}
                    defaultValue={userData.category}
                    autoComplete="off"
                    maxLength="50"
                    required
                />
                <div className="editMenuTitle">Price:</div>
                <input
                    type="text"
                    className="editField"
                    name="price"
                    placeholder="price"
                    onChange={handleChange('price')}
                    defaultValue={userData.price}
                    autoComplete="off"
                    maxLength="50"
                    required
                />
                <div className="editMenuTitle">Image path:</div>
                <input
                    type="text"
                    className="editField"
                    name="image"
                    placeholder="image"
                    onChange={handleChange('image')}
                    autoComplete="off"
                    maxLength="50"
                    required
                />
                <input type="submit"></input>
        
        </form>
        </div>
        

        


    
    </div>




  );
}

export default EditMenu;