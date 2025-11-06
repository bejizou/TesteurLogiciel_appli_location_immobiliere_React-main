import { Link } from 'react-router-dom';
import logo from '../assets/logo1.svg';
import '../component/css/header.css';

function Header() {
    return (
      <header className="header">
       
        <img className="logo" src={logo} alt="Logo Kasa" />
        
        <nav>
        <Link to="/">Accueil</Link>
        <Link to="/about">À Propos</Link>

        </nav>
      </header>
    )
  }
  export default Header;