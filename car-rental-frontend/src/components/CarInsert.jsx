import React, { useState } from 'react';
import axios from 'axios';

const CarInsert = ({ show, handleClose, setCars }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    price_per_day: '',
    fuel_type: '',
    transmission: '',
    image_url: '', // Fusha për URL e imazhit
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInsert = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/cars', formData);
      setCars((prevCars) => [...prevCars, response.data]);
      handleClose();
    } catch (error) {
      console.error('Gabim gjatë shtimit të makinës:', error.response?.data || error.message);
    }
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Shto Makinë</h5>
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
              { label: 'Image URL', name: 'image_url', type: 'url' }, // Fusha për imazhin
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
            <button type="button" className="btn btn-primary" onClick={handleInsert}>Ruaj</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarInsert;
