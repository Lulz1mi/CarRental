<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\PaymentController;

// Ruterët për CarController
Route::apiResource('cars', CarController::class);

// Ruterët për PaymentController
Route::apiResource('payments', PaymentController::class);

// Kjo siguron që mund të përdorni DELETE request për fshirjen e pagesës
Route::delete('payments/{id}', [PaymentController::class, 'destroy']);
