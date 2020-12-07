<?php

namespace App\Http\Resources;

use App\Market;
use Illuminate\Http\Resources\Json\JsonResource;

class Creneaux extends JsonResource
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
            'id' => $this->id,
            'heure_debut' => $this->heure_de_debut,
            'minute_debut' => $this->minute_de_debut,
            'heure_fin' => $this->heure_de_fin,
            'minute_fin' => $this->minute_de_fin,
            'slots' => $this->slots
        ];

    }
}
