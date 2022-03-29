import React from "react";
import './NotFound.css';
import muffin from '../../images/muffinDance.gif'

function NotFound() {
  return (
    <div className="NotFound">
      <img src={muffin} alt=""/>
      <h1>Sorry, something went wrong &#128566;</h1>
      <div>We could not find the content you were looking for.</div>
      <p>You can return back to our main page <a href="/">here</a>.</p>
    </div>
  );
}

export default NotFound;