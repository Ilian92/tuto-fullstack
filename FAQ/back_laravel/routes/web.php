<?php

use App\Http\Controllers\Api\CategoriesController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// Route::resource('categories', CategoriesController::class);

Route::get('/categories', [App\Http\Controllers\Api\CategoriesController::class, 'vue'])->name('categories');

Route::get('/categories/add', [App\Http\Controllers\Api\CategoriesController::class, 'add'])->name('categories');

Route::get('/categories/add/{slug?}', [App\Http\Controllers\Api\CategoriesController::class, 'add'])->name('categories');




// Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
