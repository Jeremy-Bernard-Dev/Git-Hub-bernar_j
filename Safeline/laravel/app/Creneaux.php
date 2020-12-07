<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Creneaux extends Model
{
    protected $fillable = [
        'heure_de_debut', 'heure_de_fin', 'minute_de_debut', 'minute_de_fin', 'slots', 'market_id',
    ];

    public function QRCODE()
    {
        return $this->belongsTo(qrcode::class);
    }

    public $table="creneaux";
}
