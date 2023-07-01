import { useState } from 'react';

function AddLocation() {
  const [location, setLocation] = useState({name: '', lat: '', lon: ''});

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Aquí debes implementar la lógica para añadir la nueva ubicación a tu base de datos.
    console.log(location);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nombre de la ubicación" onChange={e => setLocation({...location, name: e.target.value})} required />
      <input type="number" placeholder="Latitud" onChange={e => setLocation({...location, lat: e.target.value})} required />
      <input type="number" placeholder="Longitud" onChange={e => setLocation({...location, lon: e.target.value})} required />
      <button type="submit">Agregar Ubicación</button>
    </form>
  );
}

export default AddLocation;
