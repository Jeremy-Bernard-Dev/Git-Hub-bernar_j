<?php

namespace App\Http\Controllers\API;

use App\Form;
use App\Http\Controllers\Controller;
use App\Market;
use Illuminate\Http\Request;
use phpDocumentor\Reflection\File;

class FormController extends Controller
{
    public function create() {

        return view('create');
    }

    public function Image($id) {
        return Market::find($id)->image;
    }

    public function store(Request $request, $id) {
        error_log('entré');
        error_log($request->file);
        $request->file;
        request()->validate( [
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
        ] );
        error_log('validé');

        // TODO get market from id, update market->image = id market + image save() -> market
        if($request->hasFile('file'))
        {
            error_log("C'est un file");
            $image = $request->file('file');
            $name= uniqid() . '.jpeg';
            $destinationPath = public_path('/images');
            $image->move($destinationPath, $name);

            /*
             * changer le nom
             * Pas encore fait, il faut concatener id market au nom de l'image pour la rendre unique
             * */

            //update
            $market = market::where('id', $id)->first();
            if (Market::find($id)->image != '0') {
                error_log(public_path() . '/' . Market::find($id)->image);
                unlink(public_path() . '/' . Market::find($id)->image);
            }
            //$market->image = $image;
            $market->image = 'images/' . $name;

            if ($market->save() == 1) {
                return response()->json(['message'=>'wow'], 200);
            } else {
                return response()->json(['message'=>'fail'], 200);
            }
        } else {
            error_log("Tiep");
        }
    }
}
