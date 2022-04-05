import React from "react";

export default function Restaurant(props){
    return (
    <div className="restaurant">
        <div>{ props.name }</div>
        <div>{ props.category }</div>
        <div>{ props.pricelevel }</div>
    </div>);
}


/*
  <div className="restaurant">
        <img src={ props.image } />
        <div>{ props.name }</div>
        <div>{ props.category }</div>
        <div>{ props.pricelevel }</div>
    </div>);

*/