import React from "react";
import muffin from "../../images/muffinDance.gif";

function Discover(props) {

  return (
    <div className="discover">
        <img className="haha" alt="" src={muffin}></img>
    </div>,

    <div className="dRestaurant">
        <div>{ props.name }</div>
        <div>{ props.category }</div>
        <div>{ props.pricelevel }</div>
    </div>
  );
}

export default Discover;