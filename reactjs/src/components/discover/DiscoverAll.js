import React from "react";
import { useNavigate } from "react-router-dom";
import './DiscoverAll.css';


function DiscoverAll(props) {

    const navigate = useNavigate();

    function RestaurantClicked(params) { //direct to restaurant page when user clicks search result
        const restaurantPath = params.idrestaurant;
        navigate(`/restaurant/${restaurantPath}`);
    }


    return (  
        
        <div className="restaurantContainer">
        {
      
          <>{props.allRestaurants.map((item, index) => {
              return (
                  
                    <div id="restaurant" onClick={() => RestaurantClicked(item)}>
                        <div className="restaurant">                        
                            <div key={index}></div>
                            <img src={ item.image } alt="" loading="eager"></img>
                            <div className="restaurantInnerContainer">
                                <div className="restaurantName">{item.name}</div>
                                <div className="restaurantType">{item.type}</div>
                            </div>
                            <div className="restaurantsDivider" />
                            <div className="restaurantsInnerBottomContainer">
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
    );
}

export default DiscoverAll;