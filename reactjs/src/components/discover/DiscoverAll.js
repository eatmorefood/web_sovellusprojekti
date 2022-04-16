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

       <div className="DMain">
           <h1>All restaurants</h1>
            <div className="DrestaurantContainer">
                
            {
        
            <>{props.allRestaurants.map((item, index) => {
                return (
                    
                    
                        <div id="DrestaurantID" onClick={() => RestaurantClicked(item)}>
                            <div className="Drestaurant">                        
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
        
    );
}

export default DiscoverAll;