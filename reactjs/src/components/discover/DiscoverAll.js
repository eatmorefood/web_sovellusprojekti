import React from "react";
import './DiscoverAll.css';


function DiscoverAll(props) {

    return (  
        <div className="restaurantContainer">
        {
      
          <>{props.allRestaurants.map((item, index) => {
              return (
                  
                    <div className="restaurant">
                            <div key={index}></div>
                            <img src={ item.image }></img>
                            <div>{item.name}</div>
                            <div>{item.type}</div>
                            <div>{item.pricelevel}</div>
                        </div>
                   
                
        
              
            )
            })}</> 
        }  
        </div>
    );
}

export default DiscoverAll;