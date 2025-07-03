<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookingsTable extends Migration
{
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('car_id')->constrained()->onDelete('cascade');
            $table->string('user_name');
            $table->string('user_email');
            $table->integer('days');
            $table->timestamps();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email')->nullable();
            $table->date('birth_date')->nullable();
            $table->string('license')->nullable();
            $table->string('phone')->nullable();
            $table->string('street')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('payment_method')->nullable();

        });
    }

    public function down()
    {
        Schema::dropIfExists('bookings');
    }
}
