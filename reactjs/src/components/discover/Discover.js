import React from "react";
import muffin from "../../images/muffinDance.gif";
import { Link } from "react-router-dom"; 

function Discover(props) {

  return (
     
    <div>
      <p>
        <img className="haha" alt="" src={muffin}></img>
      </p>
      <Link to="allrestaurants"><button>See all restaurants</button></Link>
      
    </div>

  );
}

export default Discover;