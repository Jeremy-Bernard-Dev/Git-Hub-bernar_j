<?php
namespace App\Http\Controllers\API;
use App\Client;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;
class ClientController extends Controller
{
    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(){
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            if ($user->role_id != 1){
                return response()->json(['error'=>'Unauthorised'], 400);
            }
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
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name',
            'firstname',
            'email',
            'password',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $user = new User();
        $user->name = $request->name;
        $user->firstname = $request->firstname;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->role_id = 1;
        $user['password'] = bcrypt($user['password']);
        $user->save();

        $client = new Client();
        $client->users_id = $user->id;
        $client->save();

        $success['token'] =  $user->createToken('MyApp')-> accessToken;
        $success['user_id'] = $user->id;
        $success['user_name'] = $user->name;
        $success['user_firstname'] = $user->firstname;
        return response()->json(['success'=>$success], 201);
    }
    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function details()
    {
        $user = Auth::user();
        $model = new Client();
        $client = $model->where('users_id', $user->id)->first();
        return response()->json(['user' => $user, 'client' => $client], 200);
    }
}
