import React, { useState, useEffect } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import './Search.css'

function Search(){
    const [restaurantData, setRestaurantData] = useState([]);
    const navigate = useNavigate();

    const { search } = useLocation();
    const urlQuery = new URLSearchParams(search);
    const stateParam = urlQuery.get('q');


    useEffect(() => {
        console.log(stateParam)

        if(!stateParam){ //if there's no query, navigate to main page
            navigate('/');
        }
    }, []);

    return (
        <>{restaurantData.map((item) => {
            return (
                <div className="restaurantMainContainer" key={item.idrestaurant}>   
                    <div className="restaurantName">
                        <div>{item.name}</div>   
                        <div className="restaurantContainerType">{item.type}</div>
                    </div>               
                    <img className="restaurantImage" src={ item.image }  alt="" loading="eager"/>                    
                    
                    <div className="restaurantDataContainer">
                        <div className="restaurantDataContainerLeft">
                            <div>Categories</div>
                        </div>

                        <div className="restaurantDataContainerCenter">
                            center: <br></br><br></br>
                            basically render all restaurant products here as a list jjh jh jh jh jh jh  kkj k jk jk jk j kj k j k j kj kj k j kj kj  basically render all restaurant products here as a list jjh jh jh jh jh jh  kkj k jk jk jk j kj k j k j kj kj k j kj kj  
                        </div>

                        <div className="restaurantDataContainerRight">
                            <div className="restaurantDataTitle">Restaurant details</div>
                            <div className="restaurantDataSubtitle">Address</div>
                            <div className='restaurantDataAddress'>{item.address}</div><br></br>
                            <div className="restaurantDataSubtitle">Opening times</div>
                            <div className='restaurantDataOpeningtimes'>
                                <div>**specify weekdays**</div>
                                <div className='restaurantDataGreytext'>{item.open}</div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            );
        })}</>
    )
};
export default Search;