import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './MenuPage.css';
import Constants from '../Constants.json';
import editbtn from '../images/editbtn.png';


function EditMenu ( props ) {
  const [userData, setUserData] = useState([]);
  let { id } = useParams();
  console.log(id);

    let decodedToken = "";
    let loggedInName = "";
  
    if(props.jwt != null){
    decodedToken = jwt_decode(props.jwt);
    loggedInName = decodedToken.user.name;
    }

    useEffect(() => {
      const loadProfileDataWithJWT = async () => { //load user data to show here
        try {
            


          const results = await axios.get(Constants.API_ADDRESS + '/meal/byid/' +  id,
          {
              headers: {
                  'Authorization': 'Bearer ' + props.jwt
              }
          })
          console.log(results.data);
          if (results.data && results.data.length > 0)
          {
          setUserData(results.data[0]);
          
          }
        } catch(error) {
          console.log(error);
            console.log("something went wrong");
        }
      }
      loadProfileDataWithJWT();
    }, [props]);
    console.log("Userdata");
    console.log(userData);

    function editMenu ( props )
    {
      console.log(userData);
      console.log("Edited");
    }


    console.log(userData);
    
  return (
    <div className="menupage">
        <div>
          <h1 className="businessTitle">{loggedInName}</h1>
        </div>
        <div>This is EditMenu.js</div>
        <div className="editContent">
        <div><img className="editBtn" src={editbtn} onClick={editMenu}/></div>
        <div className="editTitle">Edit your food: </div>
        <div className="editSubTitle">Click save to save the changes.</div>
        
        <form className="editForm" onSubmit={ console.log("Submit") }>
                <div className="editMenuTitle">Name:</div>
                <input
                    type="name"
                    className="editField"
                    name="name"
                    placeholder="name"
                    defaultValue={userData.name}
                    autoComplete="off"
                    maxLength="50"
                    required
                />
        
        </form>
        </div>
        

        


    
    </div>




  );
}

export default EditMenu;