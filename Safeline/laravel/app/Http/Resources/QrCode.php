<?php

namespace App\Http\Resources;

use App\Market;
use App\User;
use Illuminate\Http\Resources\Json\JsonResource;

class QrCode extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'qr_id' => $this->id,
            'user_id' => $this->user_id,
            'marquet_id' => $this->market_id,
            'marketname' => Market::find($this->market_id)->marketname,
            'expired' => (date_timestamp_get($this->created_at) + 24 * 60 * 60 * 7) < time(),
            'nom' => User::find($this->user_id)->name.' '.User::find($this->user_id)->firstname,
            'isPersonnel' => User::find($this->user_id)->role_id == 2,
            'heure_debut' => \App\Creneaux::find($this->creneaux_id)->heure_de_debut,
            'minute_debut' => \App\Creneaux::find($this->creneaux_id)->minute_de_debut,
            'heure_fin' => \App\Creneaux::find($this->creneaux_id)->heure_de_fin,
            'minute_fin' => \App\Creneaux::find($this->creneaux_id)->minute_de_fin,
            'date_expiration' => date("d-m-Y", (date_timestamp_get($this->created_at) + 24 * 60 * 60 * 7)),
        ];
    }
}
