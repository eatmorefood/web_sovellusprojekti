import React from "react";
import SimpleImageSlider from "react-simple-image-slider";
import './Discovercss.css';

function Discover() {
  const images = [
    { url: "https://res.cloudinary.com/eatmorefood/image/upload/v1650287028/EatMoreFood/pexels-photo-2696064_jwhhe4.jpg" },
    { url: "https://res.cloudinary.com/eatmorefood/image/upload/v1650287014/EatMoreFood/pexels-igor-starkov-1307698_llr0ib.jpg" },
    { url: "https://res.cloudinary.com/eatmorefood/image/upload/v1650286941/EatMoreFood/barista-6197867__340_mz4nqe.webp" },
    { url: "https://res.cloudinary.com/eatmorefood/image/upload/v1650286931/EatMoreFood/chef-5993951__340_mjlznd.webp" },
    { url: "https://res.cloudinary.com/eatmorefood/image/upload/v1650287099/EatMoreFood/menu-restaurant-vintage-table_jc7i12.jpg" },
  ];

  return (
    <div className="discover">
      <div className="imageSliderText">Welcome to EatMoreFood for businesses. &#128075; <br></br>
      <br></br> Please login or create a new account for your business.</div>
      
      <div className="imageSlider">
          <SimpleImageSlider
            width={"100vw"}
            height={"100vh"}
            images={images}
            showBullets={false}
            showNavs={false}
            autoPlayDelay={4}
            autoPlay={true}
            loop={true}
            slideDuration={1.5}
          />


      </div>

    

    </div>
  );
}

export default Discover;