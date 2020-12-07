<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQrcodes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('qrcodes', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('market_id')->unsigned();
            $table->bigInteger('creneaux_id')->unsigned();
            $table->timestamps();
        });

        Schema::table('qrcodes', function (Blueprint $table) {
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });

        Schema::table('qrcodes', function (Blueprint $table) {
            $table->foreign('market_id')
                ->references('id')
                ->on('market')
                ->onDelete('cascade');
        });

        Schema::table('qrcodes', function (Blueprint $table) {
            $table->foreign('creneaux_id')
                ->references('id')
                ->on('creneaux')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('qrcodes');
    }
}
