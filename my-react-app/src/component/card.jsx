import './css/card.css';
import { Link ,useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import API_ENDPOINTS from '../config/api';
function Card() {

  const navigate = useNavigate();

  //  États : données, chargement, et erreur
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //  Fonction asynchrone 
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.PROPERTIES}`);

      // vérifie si la réponse HTTP est correcte
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const json = await response.json();
      setData(json); // met à jour les données dans l’état
    } catch (err) {
      
      console.error("Erreur lors de la récupération des données :", err);
      setError("Impossible de charger les logements.");

   
      navigate("/Error");
    } finally {
      setLoading(false); 
    }
  };

  //  Appel à fetchData une seule fois après le montage
  useEffect(() => {
    fetchData();
  }, []);

  // Affichage selon l’état actuel
  if (loading) {
    return <div className="loading">Chargement des logements...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }
  
  // Rendu JSX du composant
  return (
    <div className='cards'> {/* conteneur global qui regroupe toutes les cartes */}
      {data.map((card) => (  // on parcourt le tableau data et on crée une carte pour chaque élément
        <div key={card.id} className='card'> {/* chaque carte a un id unique (clé) et une classe CSS */}

          {/* Lien cliquable qui redirige vers la page d'un logement spécifique avec son id */}
          {/* On transmet aussi l'objet "card" en props via "state" */}
          <Link to={"/information/" + card.id} state={{ card }} id='card-title'>
            {/* Image de couverture de la carte, avec un texte alternatif basé sur le titre */}
            <img src={card.cover} alt={card.title} />
          

          {/* Titre de la carte (nom du logement) */}
          <h2>{card.title}</h2></Link>
        </div>
      ))}
    </div>
  );
}

// On exporte le composant Card pour pouvoir l'utiliser ailleurs dans l'application
export default Card;
