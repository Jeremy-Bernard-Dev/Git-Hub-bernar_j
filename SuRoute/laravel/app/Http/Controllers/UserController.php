<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends controller
{
    public function login(){
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')-> accessToken;
            $success['user_id'] = $user->id;
            $success['user_name'] = $user->name;
            $success['user_firstname'] = $user->firstname;
            return response()->json(['success' => $success], 200);
        }
        else{
            return response()->json(['error'=>'Unauthorised'], 400);
        }
    }

    public function register(Request $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->firstname = $request->firstname;
        $user->email = $request->email;
        $user->password = $request->password;
        $user['password'] = bcrypt($user['password']);
        $user->save();

        $success['token'] =  $user->createToken('MyApp')-> accessToken;
        $success['user_id'] = $user->id;
        $success['user_name'] = $user->name;
        $success['user_firstname'] = $user->firstname;
        return response()->json(['success'=>$success], 201);
    }

    public function emailVerification(Request $request){
        $users = User::where('email', $request->email)->first();
        if ($users == null) {
            return response()->json(['success' => 'you can take this email'], 200);
        }
        return response()->json(['error' => 'this email is already taken'], 200);
    }

    public function details()
    {
        $user = Auth::user();
        return response()->json(['user' => $user], 200);
    }
}
