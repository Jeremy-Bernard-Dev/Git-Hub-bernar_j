<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Basket extends Model
{
    protected $fillable = [
        'user_id', 'product_id', 'quantity', 'name', 'info', 'price', 'type',
    ];//
    

    protected $table = 'basket';
}
