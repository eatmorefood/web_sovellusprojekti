import React, {useRef} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 
import './Discover.css';

function Discover(props) {
  const ref = useRef(null);
  const navigate = useNavigate();

    function RestaurantClicked(params) { //direct to restaurant page when user clicks search result
      const restaurantPath = params.idrestaurant;
      navigate(`/restaurant/${restaurantPath}`);

}

const scroll = (scrollOffset) => {
  ref.current.scrollLeft += scrollOffset;
};

  return (
     
    <div className="DMain">
     <h3>The delivery service for your favourite restaurants</h3>   
     <div className="AllContainer">
        <h1>Restaurants</h1>
        <Link to="allrestaurants"><button className="buttonSeeAll">See all restaurants</button></Link>

        
        
        
      </div>
      <div className="btnDivsDiscover"><button className="leftBtnDiscover" onClick={() => scroll(-600)}>&#11164;</button>
        <button className="rightBtnDiscover" onClick={() => scroll(600)}>&#11166;</button></div>
        <div className="DMainRestaurantContainer" ref={ref}>
          <div className="DrestaurantContent" >
          

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