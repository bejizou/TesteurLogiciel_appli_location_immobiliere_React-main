import { useParams, useNavigate} from "react-router-dom";
import Carrousel from "../component/carrousel";

import Title from "../component/title";
import Tags from "../component/tags";
import Rates from "../component/rating";
import Host from "../component/host";
import Collapse from "../component/collapse";
import "./css/information.css";
import { useState } from "react";
import { useEffect } from "react";

function Accomodation() {
const Navigate = useNavigate(); 
 const cardId  = useParams().id;
  const [card, setData] = useState([]);
  console.log(cardId);
  useEffect(() => {
    
    async function  getData()  {
      const response = await fetch ("http://localhost:8080/api/properties/"+cardId);
      if (response.status == 200){
        const data = await response.json();
        setData(data);
        console.log(card);
        data.titleLength = data.title.length;
         
      }
      else {
        console.log("Id not found");
        Navigate("/Error");
      }
     
      }
      getData();
     }, [cardId]);
 
  if (card.length === 0) {
    return <div>Chargement en cours...</div>;
  }
  return (
    <div className="information">
    <Carrousel data={card} />
    <Host data={card} />
    <div>
    <Title data={card} />
    <div className="tags-rates-container">
    <Tags data={card} />
    <Rates data={card} />
    </div></div>
    
    <div className="collapse-container">
      <div className="first">
        <Collapse
          data={card.description}
          title="Description"
          id="description"/>
      </div>
      <div className="second">
        <Collapse
          data={card.equipments}
          title="Equipements"
          id="equipments"
        />
      </div>
    </div>
  </div>
    
  );
}

export default Accomodation;