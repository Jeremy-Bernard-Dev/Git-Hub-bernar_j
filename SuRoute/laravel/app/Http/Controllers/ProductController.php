<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Product;
use App\Basket;

class ProductController extends controller
{
    public function detailProduct($id) {
        $product = Product::where('id', $id)->first();
        return response()->json($product, 200);
    }

    public function detailsProduct($type) {
        $products = Product::where('type', $type)->get();
        return response()->json($products, 200);
    }

    public function addProduct(Request $request) {
        $product = new Product();
        $product->name = $request->input('name');
        $product->info = $request->input('info');
        $product->description = $request->input('description');
        $product->quantity = $request->input('quantity');
        $product->price = $request->input('price');
        $product->type = $request->input('type');
        if ($product->save() == 1) {
            return response()->json(["message" => "product was created"], 201);
        }
        else {
            return response()->json(["message" => "product was not created"], 400);
        }
    }

    public function putProduct($id, Request $request) {
        $product = Product::where('id', $id)->first();
        if ($request->input('name') != null) {
            $product->name = $request->input('name');
        }
        if ($request->input('info') != null) {
            $product->info = $request->input('info');
        }
        if ($request->input('description') != null) {
            $product->description = $request->input('description');
        }
        if ($request->input('quantity') != null) {
            $product->quantity = $request->input('quantity');
        }
        if ($request->input('price') != null) {
            $product->price = $request->input('price');
        }
        if ($request->input('type') != null) {
            $product->type = $request->input('type');
        }
        if ($product->save() == 1) {
            return response()->json(["message" => "product was updated"], 200);
        }
        else {
            return response()->json(["message" => "product was not updated"], 400);
        }
    }

    public function deleteProduct($id) {
        $product = Product::where('id', $id)->first();
        $basket = Basket::where('product_id', $id)->get();

        foreach ($basket as $bask) {
            if ($bask->delete() != 1) {
                return response()->json(["message" => "product was not deleted"], 400);
            }
        }

        if ($product->delete() == 1) {
            return response()->json(["message" => "product was deleted"], 200);
        }
        else {
            return response()->json(["message" => "product was not deleted"], 400);
        }
    }
}