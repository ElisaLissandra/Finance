<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SalaryController;
use App\Http\Controllers\CostController;
use App\Http\Controllers\FinanceController;

// Route::group([
//     'middleware' => 'api',
//     'prefix' => 'auth'
// ],
// function() {
//     Route::post('/register', [UserController::class, 'register'])->name('register');
//     Route::post('/login', [UserController::class, 'login'])->name('login');
//     Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:api')->name('logout');
//     Route::post('/refresh', [UserController::class,'refreshToken'])->middleware('auth:api')->name('refresh');

// });

Route::post('/register', [UserController::class, 'register'])->name('register');
Route::post('/login', [UserController::class, 'login'])->name('login');

Route::group(['middleware' => 'auth:api'], function() {
    Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:api')->name('logout');
    Route::post('/refresh', [UserController::class,'refreshToken'])->middleware('auth:api')->name('refresh');

    Route::get('/salary', [SalaryController::class, 'index'])->name('index');
    Route::post('/salary', [SalaryController::class, 'store'])->name('store');
    Route::get('/salary/{slug}', [SalaryController::class, 'show'])->name('show');
    Route::get('/salary/{slug}/edit', [SalaryController::class, 'edit'])->name('edit');
    Route::put('/salary/{slug}', [SalaryController::class, 'update'])->name('update');
    Route::delete('/salary/{slug}', [SalaryController::class, 'destroy'])->name('delete');

    Route::get('/cost', [CostController::class, 'index'])->name('index');
    Route::post('/cost', [CostController::class, 'store'])->name('store');
    Route::get('/cost/{slug}', [CostController::class, 'show'])->name('show');
    Route::get('/cost/{slug}/edit', [CostController::class, 'edit'])->name('edit');
    Route::put('/cost/{slug}', [CostController::class, 'update'])->name('update');
    Route::delete('/cost/{slug}', [CostController::class, 'destroy'])->name('delete');

    Route::get('/finance', [FinanceController::class, 'index'])->name('index');
});


