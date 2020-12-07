<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'info', 'description', 'quantity', 'price', 'type',
    ];//

    protected $table = 'product';
}
