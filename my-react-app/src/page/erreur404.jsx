import './css/error.css';
import { Link } from 'react-router-dom';



function Error() {
    
    return(
        
      <div className="error">
      <h1 className="error-404">404</h1>
      <span className="error-description"> 
      Oups! La page que vous demandez n'existe pas.
        </span>
        <Link to="/" className="error-link">
        Retourner sur la page d’accueil
      </Link>
       </div>
      
       
        
      
        
  )
}

export default Error