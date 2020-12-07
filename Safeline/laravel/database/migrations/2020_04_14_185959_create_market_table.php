<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMarketTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('market', function (Blueprint $table) {
            $table->id();
            $table->string('marketname', 100);
            $table->string('siret', 100);
            $table->string('phoneNumber', 15);
            $table->string('longitude', 100);
            $table->string('latitude', 100);
            $table->string('street', 100);
            $table->string('code', 10);
            $table->string('town', 100);
            $table->string('type', 100);
            $table->string('image');
            $table->integer('users_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('market');
    }
}
