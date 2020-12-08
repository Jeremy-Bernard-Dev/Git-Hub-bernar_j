<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
    function users() {
        $Users = DB::table('users')->get();
        return response()->json($Users, 200);
    }
}
