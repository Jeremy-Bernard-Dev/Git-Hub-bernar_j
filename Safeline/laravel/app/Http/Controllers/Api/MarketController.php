<?php
namespace App\Http\Controllers\API;
use App\Market;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;
class MarketController extends Controller
{
    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(){
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            if ($user->role_id != 3){
                return response()->json(['error'=>'Unauthorised'], 400);
            }
            $success['token'] =  $user->createToken('MyApp')-> accessToken;
            $success['user_id'] = $user->id;
            $success['user_name'] = $user->name;
            $success['user_firstname'] = $user->firstname;
            $success['market_id'] = DB::table('market')->where('users_id', $user->id)->first()->id;
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
        error_log($request);
        error_log("au dessus");
        $validator = Validator::make($request->all(), [
            'name',
            'firstname',
            'email',
            'password',
            'marketname',
            'siret',
            'phoneNumber',
            'longitude',
            'latitude',
            'street',
            'code',
            'town',
            'type',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $user = new User();
        $user->name = $request->name;
        $user->firstname = $request->firstname;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->role_id = 3;
        $user['password'] = bcrypt($user['password']);
        $user->save();

        $market = new Market();
        $market->users_id = $user->id;
        $market->marketname = $request->marketname;
        $market->siret = $request->siret;
        $market->phoneNumber = $request->phoneNumber;
        $market->longitude = $request->longitude;
        $market->latitude = $request->latitude;
        $market->street = $request->street;
        $market->code = $request->code;
        $market->town = $request->town;
        $market->type = $request->type;
        $market->image = 0;
        $market->save();

        $success['token'] =  $user->createToken('MyApp')-> accessToken;
        $success['user_id'] = $user->id;
        $success['user_name'] = $user->name;
        $success['user_firstname'] = $user->firstname;
        $success['market_id'] = DB::table('market')->where('users_id', $user->id)->first()->id;
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
        $model = new Market();
        $market = $model->where('users_id', $user->id)->first();
        return response()->json(['user' => $user, 'market' => $market], 200);
    }

    public function getShops() {
        return Market::all();
    }
}
