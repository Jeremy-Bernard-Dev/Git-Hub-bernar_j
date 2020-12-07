<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class qrcode extends Model
{
    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function market()
    {
        return $this->belongsTo(Market::class);
    }

    public function creneaux()
    {
        return $this->belongsTo(Creneaux::class);
    }
}
