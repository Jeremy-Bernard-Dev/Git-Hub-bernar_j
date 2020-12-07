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

Route::group(['middleware' => 'auth:api'], function() {
    Route::post('user/details', 'API\UserController@details');
});
Route::post('login/client', 'API\ClientController@login');
Route::post('register/client', 'API\ClientController@register');
Route::group(['middleware' => 'auth:api'], function() {
    Route::post('client/details', 'API\ClientController@details');
});

Route::post('login/essential', 'API\EssentialController@login');
Route::post('register/essential', 'API\EssentialController@register');
Route::group(['middleware' => 'auth:api'], function() {
    Route::post('essential/details', 'API\EssentialController@details');
});

Route::post('login/market', 'API\MarketController@login');
Route::post('register/market', 'API\MarketController@register');
Route::group(['middleware' => 'auth:api'], function() {
    Route::post('market/details', 'API\MarketController@details');
});

Route::post('emailVerification', 'API\UserController@emailVerification');
Route::get('user/details/{id}', 'API\UserController@details');

Route::get('markets','API\MarketController@getShops');

Route::post('newCreneaux', 'API\CreneauxController@postCreneaux');
Route::get('creneaux/{id}', 'API\CreneauxController@getCreneaux');
Route::put('editCreneaux/{id}', 'API\CreneauxController@putCreneaux');
Route::delete('delCreneaux/{id}', 'API\CreneauxController@deleteCreneaux');


Route::get('qrcodes/{id}','API\QRCODEController@index');
Route::post('takeCreneaux','API\CreneauxController@takeCreneaux');
Route::delete('qrcode/{id1}/{id2}','API\QRCODEController@destroy');

Route::get('Avis/{id}', 'API\AvisController@getAvis');
Route::post('newAvis', 'API\AvisController@postAvis');
Route::get('moyenne/{id}', 'API\AvisController@moyenne');

Route::put('modifier/client/{id}', 'API\UserController@modifier');

Route::post('addFavori', 'API\FavoriController@postFavori');
Route::get('Favoris/{id}', 'API\FavoriController@getFavori');
Route::delete('delFavori/{id1}/{id2}', 'API\FavoriController@delFavori');

Route::get('form','API\FormController@create');
Route::post('newForm/{id}','API\FormController@store');

Route::get('image/{id}','API\FormController@Image');
