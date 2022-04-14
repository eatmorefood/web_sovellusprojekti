import React from "react";
import muffin from "../../images/muffinDance.gif";
import './DiscoverAll.css';


function DiscoverAll(props) {

  return (  
      
      
          <>{props.allRestaurants.map((item, index) => {
              return (
                
                <div className="restaurantContainer">
                    
                        <div className="restaurant">
                            <div key={index}>
                            <img src={ item.image }></img>
                            <div>{item.name}</div>
                            <div>{item.type}</div>
                            <div>{item.pricelevel}</div>
                        </div>
                    </div>
                 </div>
        
              
            )}
          )}</> 

  );
}

export default DiscoverAll;