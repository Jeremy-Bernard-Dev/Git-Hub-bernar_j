<?php


namespace App\Http\Controllers\API;

use App\Favori;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class FavoriController extends Controller
{

    public function postFavori(Request $request) {

        if (!Favori::where('user_id', $request->user_id)->where('market_id', $request->market_id)->exists()) {

            $favori = new Favori();

            $favori->user_id = $request->user_id;
            $favori->market_id = $request->market_id;

            if ($favori->save() == 1) {
                return response()->json(["message" => "favori was created"], 201);
            } else {
                return response()->json(["message" => "favori was not created"], 400);
            }
        }
    }

    public function getFavori($id) {
        $favori = favori::where('user_id', $id)->get();
        return \App\Http\Resources\Favori::collection($favori);
    }

    public function delFavori($id1, $id2) {
        $favori = favori::where('user_id', $id1)->where('market_id', $id2)->first();
        $favori->delete();
    }
}
