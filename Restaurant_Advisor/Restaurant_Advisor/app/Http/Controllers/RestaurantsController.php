<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Restaurant;
use App\Menu;

class RestaurantsController extends Controller
{
    function restaurants() {
        $Resto = DB::table('Restaurant')->get();
        return response()->json($Resto, 200);
    }

    function menus($id) {
        $Menu = DB::table('Menu')->where('restaurant_id', $id)->get();
        return response()->json($Menu, 200);
    }
}
