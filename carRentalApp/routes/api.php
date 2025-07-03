<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MyBookingController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Makinat
Route::get('/cars', [CarController::class, 'index']);
Route::get('/cars/{car}', [CarController::class, 'show']);

// Përdoruesit
Route::get('/users', [UserController::class, 'index']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

// Menaxhimi i makinave (publik ose me middleware)
Route::post('/cars', [CarController::class, 'store']);
Route::put('/cars/{car}', [CarController::class, 'update']);
Route::delete('/cars/{car}', [CarController::class, 'destroy']);

// Pagesat
Route::apiResource('payments', PaymentController::class);
Route::delete('payments/{Payment_id}', [PaymentController::class, 'destroy']);
Route::put('/payments/{id}', [PaymentController::class, 'update']);

// Rezervime nga vizitorë (nëse lejohet)
Route::post('/reservations', [ReservationController::class, 'store']);

/*
|--------------------------------------------------------------------------
| Routes me autentifikim
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    // Auth dhe profili
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile', [ProfileController::class, 'update']);

    // Për adminin që shton përdorues
    Route::post('/users', [UserController::class, 'store']); 

    // Rezervime
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/my-bookings', [BookingController::class, 'myBookings']);
    Route::get('/all-bookings', [BookingController::class, 'allBookings']);  // Admin view e të gjitha rezervimeve
    Route::put('/bookings/{id}', [BookingController::class, 'update']);      // Përditësim
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);  // Fshirje

    // Anulimi dhe shtyrja e rezervimeve për përdoruesin
    Route::put('/bookings/{id}/cancel', [MyBookingController::class, 'cancel']);
    Route::put('/bookings/{id}/postpone', [MyBookingController::class, 'postpone']);

    // Fshirja e rezervimit nga përdoruesi (DELETE)
    Route::delete('/bookings/{id}', [MyBookingController::class, 'destroy']);
});
