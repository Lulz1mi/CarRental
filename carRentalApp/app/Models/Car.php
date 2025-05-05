<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    /**
     * Mos përdor created_at dhe updated_at
     */
    public $timestamps = false;

    /**
     * Fushat që lejohen për mass assignment
     */
    protected $fillable = [
        'Brand',
        'Model',
        'Year',
        'price_per_day',
        'fuel_type',
        'transmission',
        'image_url',
    ];
}
