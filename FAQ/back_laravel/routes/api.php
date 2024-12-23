<?php

use App\http\Controllers\Api\CategoriesController;
use App\http\Controllers\Api\SubCategoriesController;
use App\http\Controllers\Api\QuestionsController;
use App\http\Controllers\Api\AvisController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('categories', CategoriesController::class);

Route::apiResource('subcategories', SubCategoriesController::class);

Route::apiResource('questions', QuestionsController::class);

Route::apiResource('avis', AvisController::class);
// Route::get('avis/{id}/show', [AvisController::class, 'show']);
