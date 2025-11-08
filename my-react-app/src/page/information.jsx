import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Carrousel from "../component/carrousel";
import Title from "../component/title";
import Tags from "../component/tags";
import Rates from "../component/rating";
import Host from "../component/host";
import Collapse from "../component/collapse";
import API_ENDPOINTS from "../config/api";

import "./css/information.css";

function Accomodation() {
  const navigate = useNavigate();
  const { id: cardId } = useParams();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
    // fetch retourne une Promise
      fetch(`${API_ENDPOINTS.PROPERTIES}/${cardId}`)
        .then((response) => {
           // si status 4xx/5xx on rejette pour aller dans le catch
          if (!response.ok) {
  
            throw new Error(`Erreur HTTP : ${response.status}`);
          }
          return response.json();  // renvoie encore une Promise
        })
        .then((rawData) => {
           // créer une nouvelle référence 
          const formattedData = {
            ...rawData,
            titleLength: rawData.title?.length || 0,
          };
          setCard(formattedData); // déclenche un re-render
        })
        .catch((err) => {
          console.error("Erreur lors du chargement :", err);
      
          navigate("/Error"); // redirection utilisateur
        })
        .finally(() => {
          setLoading(false);
        });
    }

    getData();
  }, [cardId, navigate]);

  if (loading  || !card) {
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
        </div>
      </div>

      <div className="collapse-container">
        <div className="first">
          <Collapse data={card.description} title="Description" id="description" />
        </div>
        <div className="second">
          <Collapse data={card.equipments} title="Equipements" id="equipments" />
        </div>
      </div>
    </div>
  );
}

export default Accomodation;
