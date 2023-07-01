import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Map from './components/Map/Map';
import AddLocation from './components/AddLocation/AddLocation';
import styles from './App.module.scss';

function App() {
  return (
    <Router>
    <div className={styles.app}>
      <div className={styles.navBar}>
        <NavBar  />
      </div>
      <div className={styles.bodyContent}>
        <Routes>
          <Route path="/map" element={<Map />} />
          <Route path="/add" element={<AddLocation />} />
          <Route path="/" element={<Navigate to="/map" />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;


