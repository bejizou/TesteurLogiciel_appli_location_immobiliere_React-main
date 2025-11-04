import logoFooter from '../assets/logo_footer.png';

import './css/footer.css';

function Footer() {
    return (
      <footer className="footer">
        <img className="logoFooter" src={logoFooter} alt="Logo footer" />
        <p className="footer-txt">© 2025 Kasa. All rights reserved</p>
      </footer>
    )
  }

export default Footer