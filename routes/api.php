<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SalaryController;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
],
function() {
    Route::post('/register', [UserController::class, 'register'])->name('register');
    Route::post('/login', [UserController::class, 'login'])->name('login');
    Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:api')->name('logout');
    Route::post('/refresh', [UserController::class,'refreshToken'])->middleware('auth:api')->name('refresh');

});

Route::group(['middleware' => 'auth:api'], function() {
    Route::get('/salary', [SalaryController::class, 'index'])->name('index');
    Route::post('/salary', [SalaryController::class, 'store'])->name('store');
    Route::get('/salary/{slug}', [SalaryController::class, 'show'])->name('show');
    Route::get('/salary/{slug}/edit', [SalaryController::class, 'edit'])->name('edit');
    Route::put('/salary/{slug}', [SalaryController::class, 'update'])->name('update');
    Route::delete('/salary/{slug}', [SalaryController::class, 'destroy'])->name('delete');
});
