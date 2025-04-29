<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;

// Regjistrimi i rregullave për API
Route::apiResource('cars', CarController::class);
