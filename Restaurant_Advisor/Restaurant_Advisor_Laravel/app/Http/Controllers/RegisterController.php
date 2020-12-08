<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Register;

class RegisterController extends Controller
{
    public function register(Request $request) {
        $register = new Register;
        $register->login = $request->input('login');
        $register->password = $request->input('password');
        $register->email = $request->input('email');
        $register->name = $request->input('name');
        $register->firstname = $request->input('firstname');
        $register->age = $request->input('age');
        $register->save();
    }
}
