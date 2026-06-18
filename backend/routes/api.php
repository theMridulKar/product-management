<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

// public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// protected routes
Route::middleware('auth:api')->group(function () {

    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);

});