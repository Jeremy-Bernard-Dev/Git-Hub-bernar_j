<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class UserController extends controller
{
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

    public function modifier(Request $request, $id) {

        error_log($request);

        $user = User::where('id', $id)->first();

        $old_password = $request->input('old_password');
        $password = $request->input('password');


        if ($password == '0' || $old_password == '0') {
            error_log('pas de password ou de ancien password');
            $password = $user->password;
        } else {
            error_log('verification');
            if(!Hash::check($old_password, $user->password)) {
                error_log('Mauvais ancien password');
                return response()->json(['error'=>'Ancien mot de passe incorrect.'], 401);
            }
            $user->password = Hash::make($password);
            error_log('password changed');
        }

        $user->name = $request->input('name');
        $user->firstname = $request->input('firstname');
        $user->email = $request->input('email');
        $user->role_id = 1;
        $user->save();

        $success['user_name'] = $user->name;
        $success['user_firstname'] = $user->firstname;
        $success['user_email'] = $user->email;
        error_log('fin');
        return response()->json(['success'=>$success], 201);
    }
}
