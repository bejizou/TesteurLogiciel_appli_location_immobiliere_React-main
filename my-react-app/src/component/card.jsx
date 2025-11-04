import './css/card.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

function Card() {

  // Déclaration d'un état "data" qui contient un tableau vide au départ
  // setData est la fonction qui permet de mettre à jour cet état
  const [data, setData] = useState([]);

  // useEffect s'exécute après le rendu initial du composant
  // ici, on appelle fetchData une seule fois au montage (car tableau de dépendances vide [])
  useEffect(() => {
    fetchData();
  }, []);

  // Fonction qui récupère les données depuis l'API locale
  const fetchData = () => {
    fetch("http://localhost:8080/api/properties") // requête HTTP GET à l'API
      .then((response) => response.json())       // conversion de la réponse en JSON
      .then((json) => {
        setData(json);                           // mise à jour de l'état "data" avec les données récupérées
      });
  };
  
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
