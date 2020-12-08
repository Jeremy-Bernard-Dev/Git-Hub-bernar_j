<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Restaurant;
use App\Menu;

class RestaurantController extends Controller
{
    public function resto(Request $request) {
        $resto = new Restaurant;
        $resto->name = $request->input('name');
        $resto->description = $request->input('description');
        $resto->grade = $request->input('grade');
        $resto->localization = $request->input('localization');
        $resto->phone_number = $request->input('phone_number');
        $resto->website = $request->input('website');
        $resto->hours = $request->input('hours');
        $resto->save();
    }

    public function putresto(Request $request, $id) {
        $resto = Restaurant::where('id', $id)->first();
        $resto->name = $request->input('name');
        $resto->description = $request->input('description');
        $resto->grade = $request->input('grade');
        $resto->localization = $request->input('localization');
        $resto->phone_number = $request->input('phone_number');
        $resto->website = $request->input('website');
        $resto->hours = $request->input('hours');
        $resto->save();
    }

    public function deleteresto(Request $resquest, $id) {
        $resto = Restaurant::where('id', $id)->first();
        $resto->delete();
    }

    public function postmenu(Request $request, $id) {
        $menu = new Menu;
        $menu->name = $request->input('name');
        $menu->description = $request->input('description');
        $menu->price = $request->input('price');
        $menu->restaurant_id = $id;
        $menu->save();
    }

    public function putmenu(Request $request, $restaurant_id, $id) {
        $menu = Menu::where('restaurant_id', $id)->get();
        $menu = Menu::where('id', $id)->first();
        $menu->name = $request->input('name');
        $menu->description = $request->input('description');
        $menu->price = $request->input('price');
        $menu->restaurant_id = $id;
        $menu->save();
    }

    public function deletemenu(Request $request, $restaurant_id, $id) {
        $menu = Menu::where('restaurant_id', $id)->get();
        $menu = Menu::where('id', $id)->first();
        $menu->delete();
    }
}