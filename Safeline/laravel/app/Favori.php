<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Favori extends Model
{
    protected $fillable = [
        'user_id', 'market_id',
    ];

    protected $table = 'favori';
}
