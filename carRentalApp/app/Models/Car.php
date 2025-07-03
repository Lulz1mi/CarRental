<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $table = 'cars'; // emri i tabelës në databazë

    // Primary key me I të madhe, si në databazën tënde
    protected $primaryKey = 'Id';

    /**
     * Mos përdor created_at dhe updated_at
     */
    public $timestamps = false;

    /**
     * Fushat që lejohen për mass assignment
     */
    protected $fillable = [
        'brand',         // Marka
        'model',         // Modeli
        'year',          // Viti
        'price_per_day', // Çmimi për Ditë
        'fuel_type',     // Tipi i Karburantit
        'transmission',  // Transmisioni
        'image_url',     // URL i imazhit
    ];
}
