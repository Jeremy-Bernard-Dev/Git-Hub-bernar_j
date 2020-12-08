<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    public $table="Restaurant";

    public function menu() {
        return $this->hasMany('App\Menu');
    }
}
