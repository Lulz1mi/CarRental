<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public route për të marrë listën e makinave
Route::get('/cars', [CarController::class, 'index']);
Route::get('/cars/{car}', [CarController::class, 'show']);

// Public route për të shtuar, ndryshuar dhe fshirë makina
Route::post('/cars', [CarController::class, 'store']); // Për të shtuar makinë
Route::put('/cars/{car}', [CarController::class, 'update']); // Për të ndryshuar makinë
Route::delete('/cars/{car}', [CarController::class, 'destroy']); // Për të fshirë makinë

/*
|--------------------------------------------------------------------------
| Routes për Logout dhe Profile
|--------------------------------------------------------------------------
*/
// Për logout dhe profile nuk është e nevojshme autentifikimi
Route::post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/profile', [AuthController::class, 'profile']);
