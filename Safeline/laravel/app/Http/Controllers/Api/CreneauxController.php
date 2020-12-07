<?php

namespace App\Http\Controllers\API;

use App\Creneaux;
use App\qrcode;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;

class CreneauxController extends Controller
{
    public function postCreneaux(Request $request) {
        $creneaux = new Creneaux;
        $creneaux->heure_de_debut = $request->input('heure_de_debut');
        $creneaux->minute_de_debut = $request->input('minute_de_debut');
        $creneaux->heure_de_fin = $request->input('heure_de_fin');
        $creneaux->minute_de_fin = $request->input('minute_de_fin');
        $creneaux->slots = $request->input('slots');
        $creneaux->market_id = $request->input('market_id');
        $creneaux->save();

    }

    function getCreneaux($id) {
        $creneaux = Creneaux::where('market_id', $id)->get();
        return \App\Http\Resources\Creneaux::collection($creneaux);
    }

    public function putCreneaux(Request $request, $id) {
        $creneaux = Creneaux::where('id', $id)->first();
        $creneaux->heure_de_debut = $request->input('heure_de_debut');
        $creneaux->minute_de_debut = $request->input('minute_de_debut');
        $creneaux->heure_de_fin = $request->input('heure_de_fin');
        $creneaux->minute_de_fin = $request->input('minute_de_fin');
        $creneaux->slots = $request->input('slots');
        $creneaux->save();

    }

    public function takeCreneaux(Request $request) {
        $creneaux = Creneaux::where('id', $request->input('creneaux_id'))->first();
        if ($creneaux->slots > 0) {
            $creneaux->slots = $creneaux->slots - 1;
            $creneaux->save();
        } else {
            return response()->json(['success'=>'Réservation refusée. Aucun slot disponible.'], 401);
        }


        $new_qr = new QRCODE;
        $new_qr->market_id = $request->input('market_id');
        $new_qr->user_id = $request->input('user_id');
        $new_qr->creneaux_id = $request->input('creneaux_id');
        $new_qr->save();

        return response()->json(['success'=>'Réservation validée.'], 201);
    }

    public function deleteCreneaux($id) {
        $creneaux = Creneaux::where('id', $id)->first();
        $creneaux->delete();
    }
}
