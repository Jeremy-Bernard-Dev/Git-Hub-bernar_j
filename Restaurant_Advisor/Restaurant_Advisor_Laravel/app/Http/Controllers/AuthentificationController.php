<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Authentification;

class AuthentificationController extends Controller
{
    public function auth(Request $request) {
        $auth = new Authentification;
        $auth->login = $request->input('login');
        $auth->password = $request->input('password');
        $auth->save();
    }
}
