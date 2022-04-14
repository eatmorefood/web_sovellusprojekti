import React, { useEffect } from "react";
import { useNavigate, useLocation, Link} from "react-router-dom";
import './Search.css'

function Search(props){
    const navigate = useNavigate();

    const { search } = useLocation();
    const urlQuery = new URLSearchParams(search);
    const stateParam = urlQuery.get('q');


    useEffect(() => {
        if(!stateParam){ //if there's no query, navigate to main page
            navigate('/');
        }
    }, [navigate, stateParam]);

    function SearchItemClicked(params) { //direct to restaurant page when user clicks search result
        const restaurantPath = params.idrestaurant;
        navigate(`/restaurant/${restaurantPath}`);
    }

    return (
    <div id="SearchResultsMain">
        <h1>Search results for "<span>{stateParam}</span>"</h1>
        <div id="SearchResultsContainer">{
            props.allRestaurants.filter(item => {
                if (stateParam === '') {
                    navigate('/');
                    return null;
                } else if (item.name.toLowerCase().includes(stateParam.toLowerCase()) ||
                            item.type.toLowerCase().includes(stateParam.toLowerCase()) ||
                            item.address.toLowerCase().includes(stateParam.toLowerCase())) {
                    return item;
                } else {
                    return null;
                }
            }
            ).map((item => (
                <Link className="SearchResultsItemLink" to={`/restaurant/${item.idrestaurant}`} key={item.idrestaurant}>
                    <div id="SearchResultItemCard" onClick={() => SearchItemClicked(item)} >
                        <img className="searchResultItemPhoto" src={item.image} alt="" loading="eager"/>
                        <div className="SearchResultItemInnerContainer">
                            <div className="SearchResultItemRestaurantName">{item.name}</div>
                            <div className="SearchResultItemRestaurantType">{item.type}</div>
                        </div>
                        <div className="SearchResultItemDivider" />
                        <div className="SearchResultItemInnerBottomContainer">
                            <div className="SearchResultItemRestaurantPriceLevel">{item.pricelevel}</div>
                            <div className="SearchResultItemMiddledot">·</div>
                            <div className="SearchResultItemRestaurantAddress">{item.address}</div>
                        </div>
                    </div>
                </Link>
            )))
        }</div>
    </div>);
};
export default Search;