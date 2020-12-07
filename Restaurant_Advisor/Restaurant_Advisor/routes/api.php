<?php

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', 'UsersController@users');

Route::get('/restaurants', 'RestaurantsController@restaurants');

Route::get('/restaurant/{id}/menus', 'RestaurantsController@menus');

Route::post('/restaurant', 'RestaurantController@resto');

Route::post('/restaurant/{id}/menu', 'RestaurantController@postmenu');

Route::put('/restaurant/{id}', 'RestaurantController@putresto');

Route::put('/restaurant/{restaurant_id}/menu/{id}', 'RestaurantController@putmenu');

Route::delete('/restaurant/{id}', 'RestaurantController@deleteresto');

Route::delete('/restaurant/{restaurant_id}/menu/{id}', 'RestaurantController@deletemenu');

Route::post('auth', 'API\UserController@login');
Route::post('register', 'API\UserController@register');
Route::group(['middleware' => 'auth:api'], function(){
    Route::post('details', 'API\UserController@details');
});