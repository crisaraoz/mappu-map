import { Link } from "react-router-dom";
import styles from './NavBar.module.scss';
import logoImage from '../../assets/Logo_Mappu 1x1.png';
import { useState } from 'react';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navBar}>
      <div className={styles.logo}>
      <a href="https://instagram.com/cris.araozz" target="_blank" rel="noopener noreferrer">
        <img src={logoImage} alt="Logo" className={styles.logoImage} />
      </a>  
      </div>
      <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <ul className={`${styles.navList} ${isOpen ? styles.open : ''}`}>
        <li><Link to="/map" onClick={() => setIsOpen(false)}>Lugares</Link></li>
        <li><Link to="/add" onClick={() => setIsOpen(false)}>Agregar Ubicación</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
