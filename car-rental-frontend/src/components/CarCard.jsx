import React from 'react';

const CarCard = ({ car, selected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(car)}
      className={`cursor-pointer rounded-lg shadow-md overflow-hidden border-2
        ${selected ? 'border-blue-500' : 'border-gray-300'}
        hover:shadow-xl transition-shadow duration-300`}
    >
      <img
        src={car.image_url}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{car.brand} {car.model}</h3>
        <p className="text-gray-600">Viti: {car.year}</p>
        <p className="text-gray-800 font-semibold mt-2">Çmimi për ditë: {car.price_per_day} €</p>
      </div>
    </div>
  );
};

export default CarCard;
