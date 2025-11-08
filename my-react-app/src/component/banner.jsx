import React from "react";
import "../component/css/banner.css"

function Banner({bannerImage, bannerTitle}) {
    
    return (
        <section className="banner-container">
            <div className="banner">
            <img className="bannerImage" src={bannerImage} alt="banner image" />
            
            <h1 className='banner-title'>{bannerTitle}</h1>
           </div>
        </section>
        
          
        
    )
  }
  export default Banner;