// src/components/AddPayment.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddPayment = () => {
    const [payment, setPayment] = useState({
        rental_id: '',
        car_id: '',
        user_id: '',
        amount: '',
        payment_method: '',
        status: ''
    });

    const handleChange = (e) => {
        setPayment({ ...payment, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:8000/api/payments', payment)
            .then(response => {
                console.log("Payment added:", response.data);
            })
            .catch(error => {
                console.log("Error adding payment:", error);
            });
    };

    return (
        <div>
            <h1>Shto Një Pagesë</h1>
            <form onSubmit={handleSubmit}>
                <input type="number" name="rental_id" value={payment.rental_id} onChange={handleChange} placeholder="Rental ID" required />
                <input type="number" name="car_id" value={payment.car_id} onChange={handleChange} placeholder="Car ID" required />
                <input type="number" name="user_id" value={payment.user_id} onChange={handleChange} placeholder="User ID" required />
                <input type="number" name="amount" value={payment.amount} onChange={handleChange} placeholder="Amount" required />
                <input type="text" name="payment_method" value={payment.payment_method} onChange={handleChange} placeholder="Payment Method" required />
                <input type="text" name="status" value={payment.status} onChange={handleChange} placeholder="Status" required />
                <button type="submit">Shto</button>
            </form>
        </div>
    );
};

export default AddPayment;
