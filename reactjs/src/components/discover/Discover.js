import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 
import './Discover.css';

function Discover(props) {

  const navigate = useNavigate();

    function RestaurantClicked(params) { //direct to restaurant page when user clicks search result
      const restaurantPath = params.idrestaurant;
      navigate(`/restaurant/${restaurantPath}`);

}

  return (
     
    <div className="DMain">
     <h3>The delivery service for your favourite restaurants</h3>   
     <div className="AllContainer">
        <h1>Restaurants</h1>
        <Link to="allrestaurants"><button className="buttonSeeAll">See all restaurants</button></Link>
        
      </div>
        <div className="DMainRestaurantContainer">
          <div className="DrestaurantContent">

          {
          <>{props.allRestaurants.map((item, index) => {
            return (
                
                
                    <div id="DrestaurantID" onClick={() => RestaurantClicked(item)}>
                        <div className="DMainRestaurant">                        
                            <div key={index}></div>
                            <img src={ item.image } alt="" loading="eager"></img>
                            <div className="DrestaurantInnerContainer">
                                <div className="DrestaurantName">{item.name}</div>
                                <div className="DrestaurantType">{item.type}</div>
                            </div>
                            <div className="DrestaurantsDivider" />
                            <div className="DrestaurantsInnerBottomContainer">
                                <div>{item.pricelevel}</div>
                                <div>·</div>
                                <div>{item.address}</div>
                            </div>
                        </div>
                    </div>   
                
            
            )
            })}</> 


          }
          </div>
        </div>
      
    </div>

  );
}

export default Discover;