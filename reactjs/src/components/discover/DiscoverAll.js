import React from "react";
import muffin from "../../images/muffinDance.gif";
import allRestaurants from "../../App.js";


function DiscoverAll() {

  return (
     
    <div>
      <p>
        <img className="haha" alt="" src={muffin}></img>
      </p>
      <p>
          <>{allRestaurants.map((item, index) => {
              return (
                  <div key={index}>
                    <div>{item.name}</div>
                  </div>
              
            )}
          )}</>
      </p>
     
      
    </div>

  );
}

export default DiscoverAll;