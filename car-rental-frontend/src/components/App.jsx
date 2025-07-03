// src/App.jsx
import React from 'react';
import Payments from './components/Payments';
import AddPayment from './components/AddPayment';

function App() {
  return (
    <div>
      <h1>Car Rental System</h1>
      <Payments />
      <AddPayment />
    </div>
  );
}

export default App;
  