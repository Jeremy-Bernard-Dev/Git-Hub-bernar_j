<?php


namespace App\Http\Controllers\API;
use App\Avis;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AvisController extends Controller
{
    public function getAvis($id) {
        $avis = DB::table('avis')->where('market_id', $id)->get();
        return response()->json($avis, 200);
    }

    public function moyenne($id) {
        $avis = DB::table('avis')->where('market_id', $id)->get();
        $count = DB::table('avis')->where('market_id', $id)->count();
        $total_showed = $avis->sum('security');
        if ($count == 0) {
            $moyenne['moyenne'] = 0;
        } else {
            $moyenne['moyenne'] = round($total_showed / $count,1);
        }
        $moyenne['total_comment'] = $count;
        return response()->json($moyenne, 200);
    }

    public function postAvis(Request $request){
        $avis = new Avis();
        $avis->security = $request->security;
        $avis->customer = $request->customer;
        $avis->comment = $request->comment;
        $avis->users_id = $request->users_id;
        $avis->users_name = $request->users_name;
        $avis->users_firstname = $request->users_firstname;
        $avis->market_id = $request->market_id;
        if ($avis->save() == 1) {
            return response()->json(["message" => "avis was created"], 201);
        }
        else {
            return response()->json(["message" => "avis was not created"], 400);
        }
    }
}
