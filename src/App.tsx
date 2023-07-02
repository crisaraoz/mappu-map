import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Map from './components/Map/Map';
import AddLocation from './components/AddLocation/AddLocation';
import styles from './App.module.scss';
import { useState } from 'react';

function App() {
  const [selectedLocation, setSelectedLocation] = useState('all');

  const handleLocationFilter = (location: string) => {
    setSelectedLocation(location);
  };

  return (
    <Router>
      <div className={styles.app}>
        <div className={styles.navBar}>
          <NavBar onLocationFilter={handleLocationFilter} />
        </div>
        <div className={styles.bodyContent}>
          <Routes>
            <Route path="/" element={<Map selectedLocation={selectedLocation} />} />
            <Route path="/add" element={<AddLocation />} />
            <Route path="/" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
