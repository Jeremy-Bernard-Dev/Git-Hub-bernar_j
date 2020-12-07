<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{

    public function QRCODE()
    {
        return $this->hasMany(qrcode::class);
    }
}
