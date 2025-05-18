<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    // Specifikoni emrin e tabelës nëse është ndryshe nga emri i modelit
    protected $table = 'payments';
    
    // Specifikoni emrin e kolonës së primary key
    protected $primaryKey = 'Payment_id';
    
    // Specifikoni që primary key është int dhe mund të inkrementohet
    public $incrementing = true;
    protected $keyType = 'int';

    // Nuk përdorim created_at dhe updated_at
    public $timestamps = false;

    // Caktoni emrat e kolonave që mund të plotësohen
    protected $fillable = [
        'rental_id',
        'car_id',
        'user_id',
        'amount',
        'payment_method',
        'status',
    ];
}