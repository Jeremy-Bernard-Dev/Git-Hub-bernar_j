<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Market extends Model
{
    public function QRCODE()
    {
        return $this->belongsTo(qrcode::class);
    }

    protected $fillable = [
        'marketname', 'siret', 'phoneNumber', 'longitude','latitude', 'street', 'code', 'town', 'image', 'users_id',
    ];

    protected $table = 'market';
}
