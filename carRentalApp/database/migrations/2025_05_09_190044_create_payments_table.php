<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id('payment_id');
            $table->unsignedBigInteger('rental_id');
            $table->unsignedBigInteger('car_id');
            $table->unsignedBigInteger('user_id');
            $table->decimal('amount', 10, 2);
            $table->string('payment_method', 50);
            $table->string('status', 50);
            $table->timestamps();
        
            $table->foreign('rental_id')->references('id')->on('rentals')->onDelete('cascade');
            $table->foreign('car_id')->references('id')->on('cars')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
 