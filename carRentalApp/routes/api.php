<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\UserController;

Route::get('/users', [UserController::class, 'index']);

// Regjistrimi i rregullave për API
Route::apiResource('cars', CarController::class);
