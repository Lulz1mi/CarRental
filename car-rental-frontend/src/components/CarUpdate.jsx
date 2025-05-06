import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarUpdate = ({ show, handleClose, selectedCar, setCars }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    price_per_day: '',
    fuel_type: '',
    transmission: '',
  });

  useEffect(() => {
    if (selectedCar) {
      setFormData({
        brand: selectedCar.brand || '',
        model: selectedCar.model || '',
        year: selectedCar.year || '',
        price_per_day: selectedCar.price_per_day || '',
        fuel_type: selectedCar.fuel_type || '',
        transmission: selectedCar.transmission || '',
      });
    }
  }, [selectedCar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/cars/${selectedCar.id}`, formData);
      setCars(prevCars => prevCars.map(car => (car.id === selectedCar.id ? response.data : car)));
      handleClose();
    } catch (error) {
      console.error('Gabim gjatë përditësimit të makinës:', error.response?.data || error.message);
    }
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Përditëso Makinën</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {[
              { label: 'Brand', name: 'brand' },
              { label: 'Model', name: 'model' },
              { label: 'Year', name: 'year', type: 'number' },
              { label: 'Price Per Day', name: 'price_per_day', type: 'number' },
              { label: 'Fuel Type', name: 'fuel_type' },
              { label: 'Transmission', name: 'transmission' },
            ].map(({ label, name, type = 'text' }) => (
              <div className="form-group" key={name}>
                <label htmlFor={name}>{label}:</label>
                <input
                  type={type}
                  className="form-control"
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Mbyll</button>
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Ruaj</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarUpdate;
