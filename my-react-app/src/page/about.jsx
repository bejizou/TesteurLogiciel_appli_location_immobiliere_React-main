import { useState } from "react";
import styled from "styled-components";
import Banner from "../component/banner";
import Collapse from "../component/collapse";
import AboutImageBanner from "../assets/about-banner.png"
const aboutData = [
  {
    id: "1",
    title: "Fiabilité",
    description:
      "Les annonces postées sur Kasa garantissent une fiabilité totale. ",
  },
  {
    id: "2",
    title: "Respect",
    description:
      "La bienveillance fait partie des valeurs fondatrices de Kasa.",
  },
  {
    id: "3",
    title: "Service",
    description:
      "La bienveillance fait partie des valeurs fondatrices de Kasa.",
  },
  {
    id: "4",
    title: "Sécurité",
    description:
      "La sécurité est la priorité de Kasa" }
];
export default function About() {
   return(
        
        <>
        <Banner bannerImage={AboutImageBanner} />


        <div className='collapse'>

        {aboutData.map((collapse) => (

          <Collapse title= {collapse.title} data={collapse.description} />
                 
           
        ))}
      </div>
        </>
        
        
      
        
  )

}


