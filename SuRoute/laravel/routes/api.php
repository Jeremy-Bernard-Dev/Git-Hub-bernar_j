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

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register');
Route::post('emailVerification', 'UserController@emailVerification');
Route::group(['middleware' => 'auth:api'], function() {
    Route::post('details', 'UserController@details');
});

Route::get('Product/{id}', 'ProductController@detailProduct');
Route::get('Products/{type}', 'ProductController@detailsProduct');
Route::post('addProduct', 'ProductController@addProduct');
Route::post('putProduct/{id}', 'ProductController@putProduct');
Route::delete('deleteProduct/{id}', 'ProductController@deleteProduct');

Route::get('Basket/{id}', 'BasketController@detailBasket');// ajouter le prix total + remplacer les id user/product par leur contenu
Route::post('addBasket/{id1}/{id2}', 'BasketController@addBasket');// si la personne à déja l'article dans le panier, seulement augmenter la quantité
Route::post('putBasket/{id1}/{id2}', 'BasketController@putBasket');
Route::delete('deleteBasket/{id1}/{id2}', 'BasketController@deleteBasket');