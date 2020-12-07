<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Avis extends Model
{
    protected $fillable = [
        'users_id', 'user_name', 'user_firstname', 'market_id', 'security', 'customer', 'comment'
    ];

    protected $table = 'avis';
}
