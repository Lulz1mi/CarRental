import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarUpdate from '../components/CarUpdate';
import CarInsert from '../components/CarInsert';


const Cars = () => {
  const [cars, setCars] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showInsertModal, setShowInsertModal] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Gabim gjatë marrjes së të dhënave:', error);
      }
    };

    fetchCars();
  }, []);

  const handleUpdate = (id) => {
    const car = cars.find(c => c.id === id);
    setSelectedCar(car);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedCar(null);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("A jeni të sigurt që dëshironi të fshini këtë makinë?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/cars/${id}`);
        setCars(cars.filter(car => car.id !== id));
      } catch (error) {
        console.error('Gabim gjatë fshirjes së makinës:', error);
      }
    }
  };

  const handleCloseInsertModal = () => {
    setShowInsertModal(false);
  };

  return (
    <div className="container">
      <h2>CarRental</h2>
      <button className="btn btn-success" onClick={() => setShowInsertModal(true)}>Shto Makinë</button>
      <table className="table">
        <thead>
          <tr>
            <th>Marka</th>
            <th>Modeli</th>
            <th>Viti</th>
            <th>Çmimi për Ditë</th>
            <th>Tipi i Karburantit</th>
            <th>Transmisioni</th>
            <th>Veprimet</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.Brand}</td>
              <td>{car.Model}</td>
              <td>{car.Year}</td>
              <td>{car.price_per_day}</td>
              <td>{car.fuel_type}</td>
              <td>{car.transmission}</td>
              <td>
                <button className="btn btn-primary me-2" onClick={() => handleUpdate(car.id)}>Përditëso</button>
                <button className="btn btn-danger" onClick={() => handleDelete(car.id)}>Fshi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CarUpdate show={showUpdateModal} handleClose={handleCloseUpdateModal} selectedCar={selectedCar} setCars={setCars} />
      <CarInsert show={showInsertModal} handleClose={handleCloseInsertModal} setCars={setCars} />
    </div>
  );
};

export default Cars;
