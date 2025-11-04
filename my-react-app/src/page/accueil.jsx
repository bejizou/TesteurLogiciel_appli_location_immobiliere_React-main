import React, { useState } from "react";
import Banner from "../component/banner.jsx";
import ImageBanner from "../assets/banner.svg";
import Card from "../component/card.jsx";


const Home = () => {
  return (
    <>
      <Banner
        bannerImage={ImageBanner}
        bannerTitle="Chez vous, partout et ailleurs"
      />
      
      <div className="card-container">
      <Card />
    </div>
   
    </>
  );
};

export default Home;