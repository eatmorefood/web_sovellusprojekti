import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './MenuPage.css';
import Constants from '../Constants.json';
import trashcan from '../images/delete.png';


function EditMenu ( props ) {
  //const EditMenu = ({ handleChange }) => {
  const [userData, setUserData] = useState([]);
  let { id } = useParams();
  //console.log(id);

    let decodedToken = "";
    let loggedInName = "";

    let navigation = useNavigate(); 
  
    if(props.jwt != null){
    decodedToken = jwt_decode(props.jwt);
    loggedInName = decodedToken.user.name;
    }

    const handleChange = input => e => {   //Handle fields change
      //this.setUserData({ [input]: e.target.value });
      userData[input] = e.target.value;
    }

    const handleImageChange = input => e => {
      userData.image = e.target.files[0];
    }

    const handleDelete = async (e) => {
      await axios.delete(Constants.API_ADDRESS + '/meal/' + id,
      {
        headers: {
          'Authorization': 'Bearer ' + props.jwt
      }
      });
      navigation("/");
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
            results.data[0].image = null;
          setUserData(results.data[0]);
          
          }
        } catch(error) {
          console.log(error);
            console.log("something went wrong");
        }
      }    
        if(id !== "new")
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
        var result = await axios.post(Constants.API_ADDRESS + "/meal",
        {
          idfood: userData.idfood,
          name: userData.name,
          category: userData.category,
          description: userData.description,
          price: userData.price,
          idrestaurant: userData.idrestaurant
        });
        console.log("Result");
        console.log(result);
        console.log(result.idfood);
        console.log(result.data.idfood);
        if(!userData.idfood)
        {
          userData.idfood = result.data.idfood;
        }
        console.log("image");
        console.log(userData.image);
        if(userData.image)
        {
          console.log("Update image");
          const data = new FormData();
          data.append('file', userData.image);
          data.append('idfood', userData.idfood);
          var result = await axios.put(Constants.API_ADDRESS + "/meal/imageupload",
            data
          );
        }
        alert('Tallennettu!');
      }

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
                    type="file"
                    className="editField"
                    name="image"
                    placeholder="image"
                    onChange={handleImageChange('image')}
                    autoComplete="off"
                    maxLength="50"
                />
                <input type="submit"></input>
                <img className="deleteBtn" onClick={handleDelete} src={trashcan}/>
        
        </form>
        </div>
        

        


    
    </div>




  );
}

export default EditMenu;