<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'user_id', 'car_id', 'start_date', 'end_date', 'status',
        'first_name', 'last_name', 'email', 'birth_date',
        'license', 'phone', 'street', 'postal_code', 'payment_method', 'total_payment'
    ];

    // Marrim veturën e rezervuar
    public function car()
    {
        return $this->belongsTo(Car::class, 'car_id', 'id');
    }

    // Marrim përdoruesin që ka bërë rezervimin
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
