<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Basket;
use App\Product;

class BasketController extends controller
{
    public function detailBasket($id) {
        $basket = Basket::where('user_id', $id)->get();
        $total = 0;
        foreach($basket as $item) {
            $total = $total + ($item->price*$item->quantity);
        }
        return response()->json(['basket'=>$basket, 'total'=>$total], 200);
    }

    public function addBasket($id1, $id2, Request $request) {
        $product = Product::where('id', $id2)->first();
        if ($product->quantity == 0) {
            return response()->json(["message" => "This product is out of stock"], 400);
        }
        $product->quantity = $product->quantity - $request->input('quantity');
        if ($product->quantity < 0) {
            return response()->json(["message" => "Too much products added"], 400);
        }
        if ($product->save() != 1) {
            return response()->json(["message" => "Quantity was not updated"], 400);
        }
        
        $basket = Basket::where('user_id', $id1)->where('product_id', $id2)->first();
        if ($basket != null) {
            $basket->quantity = $basket->quantity + $request->input('quantity');
        } else {
            $basket = new Basket();
            $basket->quantity = $request->input('quantity');
            $basket->user_id = $id1;
            $basket->product_id = $id2;
            $basket->name = $product->name;
            $basket->info = $product->info;
            $basket->price = $product->price;
            $basket->type = $product->type;
        }
        if ($basket->save() == 1) {
            return response()->json(["message" => "Product was added to basket"], 201);
        }
        else {
            return response()->json(["message" => "Product was not added to basket"], 400);
        }
    }

    public function putBasket($id1, $id2, Request $request) {
        $basket = Basket::where('user_id', $id1)->where('product_id', $id2)->first();
        $product = Product::where('id', $id2)->first();

        $basket->quantity = $basket->quantity + $request->input('quantity');
        if ($basket->quantity == 0) {
            return $this->deleteBasket($id1, $id2);
        }

        $product->quantity = $product->quantity - $request->input('quantity');
        if ($product->quantity < 0) {
            return response()->json(["message" => "This product is out of stock"], 400);
        }

        if ($product->save() != 1) {
            return response()->json(["message" => "Quantity was not updated"], 400);
        }
        if ($basket->save() == 1) {
            return response()->json(["message" => "Quantity was updated"], 200);
        }
        else {
            return response()->json(["message" => "Quantity was not updated"], 400);
        }
    }

    public function deleteBasket($id1, $id2) {
        $basket = Basket::where('user_id', $id1)->where('product_id', $id2)->first();
        $product = Product::where('id', $id2)->first();

        $product->quantity = $product->quantity + $basket->quantity;
        if ($product->save() != 1) {
            return response()->json(["message" => "Quantity was not updated"], 400);
        }
        if ($basket->delete() == 1) {
            return response()->json(["message" => "product was deleted to basket"], 200);
        }
        else {
            return response()->json(["message" => "product was not deleted to basket"], 400);
        }
    }
}