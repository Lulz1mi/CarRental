import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/cars')
      .then((response) => {
        setCars(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ka ndodhur një gabim:', error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (car) => {
    console.log('Ndrysho makinën:', car);
    // Këtu mund të hapësh një formë për editim ose navigim te një faqe tjetër
  };

  const handleDelete = (id) => {
    console.log('Fshij makinën me ID:', id);
    // Mund të shtosh axios.delete për ta fshirë nga API në backend
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Lista e Makinave</h1>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Marka</th>
            <th>Modeli</th>
            <th>Viti</th>
            <th>Çmimi për ditë</th>
            <th>Lloji i karburantit</th>
            <th>Transmisioni</th>
            <th>Veprime</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>{car.price_per_day}</td>
              <td>{car.fuel_type}</td>
              <td>{car.transmission}</td>
              <td>
                <button onClick={() => handleEdit(car)}>Ndrysho</button>{' '}
                <button onClick={() => handleDelete(car.id)}>Fshij</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarList;
