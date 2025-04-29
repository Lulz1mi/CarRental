import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Bëj kërkesë në API-në Laravel për të marrë të dhënat
    axios.get('http://localhost:8000/api/cars') // URL që i përgjigjet backend-it të Laravel
      .then((response) => {
        setCars(response.data); // Vendos të dhënat në state
        setLoading(false); // Përcakto që ngarkimi ka përfunduar
      })
      .catch((error) => {
        console.error('Ka ndodhur një gabim:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Lista e Makinave</h1>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>{car.name} - {car.year}</li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
