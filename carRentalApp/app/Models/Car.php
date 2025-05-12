<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{

    protected $table = 'cars'; // ose emri real i tabelës në databazë

    /**
     * Mos përdor created_at dhe updated_at
     */
    public $timestamps = false;

    /**
     * Fushat që lejohen për mass assignment
     */
    protected $fillable = [
        'Brand',         // Marka
        'Model',         // Modeli
        'Year',          // Viti
        'price_per_day', // Çmimi për Ditë
        'fuel_type',     // Tipi i Karburantit
        'transmission',  // Transmisioni
        'image_url',     // URL i imazhit
    ];
    
}
