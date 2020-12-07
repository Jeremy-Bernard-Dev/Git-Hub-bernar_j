<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Favori extends JsonResource
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
            'favori_id' => $this->id,
            'id' => \App\Market::find($this->market_id)->id,
            'marketname' => \App\Market::find($this->market_id)->marketname,
            'town' => \App\Market::find($this->market_id)->town,
            'type' => \App\Market::find($this->market_id)->type,
            'code' => \App\Market::find($this->market_id)->code,
            'latitude' => \App\Market::find($this->market_id)->latitude,
            'longitude' => \App\Market::find($this->market_id)->longitude,
            'phoneNumber' => \App\Market::find($this->market_id)->phoneNumber,
            'street' => \App\Market::find($this->market_id)->street,
            'users_id' => \App\Market::find($this->market_id)->users_id,
        ];
    }
}
