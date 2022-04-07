import React from "react";
import './SearchPopup.css';
import { useNavigate } from "react-router-dom";

function SearchPopup(props) {
    const navigate = useNavigate();
    let SearchPopupVariables = <><div className="SearchPopupNothingFound">Nothing was found... &#128580;</div></>;

    window.onclick = function(event) { //close search popup results if user clicks outside results container
        let a = document.getElementById('SearchPopup');
        if (!a.contains(event.target)) {
            props.emptyPopupSearch();
        }
    }

    function SearchItemClicked(params) { //direct to restaurant page when user clicks search result
        const restaurantPath = params.idrestaurant;
        navigate(`/restaurant/${restaurantPath}`);
        props.emptyPopupSearch();
    }

    function SearchShowAll(params){
        let queryParams = params;
        navigate(`/search/?q=${queryParams}`);
    }

  return (
    <div id="SearchPopup">{
        props.allRestaurants.filter(item => {
            if (props.query === '') {
                return null;
            } else if (item.name.toLowerCase().includes(props.query.toLowerCase()) || item.address.toLowerCase().includes(props.query.toLowerCase())) {
                SearchPopupVariables = <><div className="SearchPopupShowAll" onClick={() => SearchShowAll(props.query) }>Show all results</div></>;
                return item;
            } else {
                return null;
            }
        }
        ).slice(0, 5).map((item, index) => (
            <div id="SearchPopupItem" key={index}>
                <div className="SearchPopupItemContainer">
                    <img className="searchPopupItemPhoto" src={item.image} alt="" loading="eager"/>
                    <div className="SearchPopupItemInnerContainer" onClick={() => SearchItemClicked(item)}>
                        <div className="SearchPopupItemRestaurantName">{item.name}</div>
                        <div className="SearchPopupItemRestaurantType">{item.type}</div>
                        <div className="SearchPopupItemRestaurantContainer">
                            <div className="SearchPopupItemRestaurantPriceLevel">{item.pricelevel}</div>
                            <div className="SearchPopupItemMiddledot">·</div>
                            <div className="SearchPopupItemRestaurantAddress">{item.address}</div>
                        </div>
                    </div>
                </div>
                <div className="SearchPopupItemDivider"/>
            </div>
        ))
    }
    { SearchPopupVariables}
    
    </div>
  );
}

export default SearchPopup;