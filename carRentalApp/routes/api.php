<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;  // Shtuar importi i UserController

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public routes për makina
Route::get('/cars', [CarController::class, 'index']);
Route::get('/cars/{car}', [CarController::class, 'show']);

// Public routes për përdoruesit  <-- Shtuar kjo rrugë
Route::get('/users', [UserController::class, 'index']);

// Public routes për shtim, ndryshim dhe fshirje të makinave
Route::post('/cars', [CarController::class, 'store']);
Route::put('/cars/{car}', [CarController::class, 'update']);
Route::delete('/cars/{car}', [CarController::class, 'destroy']);

// Payments API
Route::apiResource('payments', PaymentController::class);
Route::delete('payments/{id}', [PaymentController::class, 'destroy']); // Opsional nëse dëshiron ta mbash veçmas
Route::put('/payments/{id}', [PaymentController::class, 'update']);

Route::delete('/users/{id}', [UserController::class, 'destroy']);


/*
|--------------------------------------------------------------------------
| Routes që kërkojnë autentifikim
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
});
