<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Essential extends Model
{
    protected $fillable = [
        'staffid', 'users_id',
    ];

    protected $table = 'essential';
}
