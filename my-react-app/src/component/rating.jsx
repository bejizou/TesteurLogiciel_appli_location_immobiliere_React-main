import pinkStar from '../assets/pink-star.svg';
import greyStar from '../assets/grey-star.svg';
import '../component/css/rating.css'

function Rates({ data }) {
    
    
    const stars = [];
    const rating = data.rating;

    // Ajouter les étoiles remplies en fonction de `rate`
    for (let i = 0; i < rating ; i++) {
        stars.push(<img key={i} src={pinkStar} alt="star full" className="star" />);
    }

    // Ajouter les étoiles vides pour compléter jusqu'à 5 étoiles
    for (let i = rating; i < 5; i++) {
        stars.push(<img key={i} src={greyStar} alt="star empty" className="star" />);
    }

    return (
        <div className= { data.titleLength < 25 ? "rating" : "rating-long-title"} >
            {stars}
        </div>
    );
  }
  
  export default Rates;