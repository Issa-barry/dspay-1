<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('agents', function (Blueprint $table) {
            $table->id();
            $table->string('reference', 4)->unique();
            $table->string('nom', 100);
            $table->string('prenom', 100);
            $table->string('phone')->unique();
            $table->string('email')->unique();
            $table->string('pays', 100);
            $table->string('adresse', 255);
            $table->string('ville', 100);
            $table->string('code_postal', 5);
            $table->enum('statut', ['activé', 'bloqué', 'archivé', 'attente'])->default('attente');
            $table->timestamps();
        });
    }

    /** 
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agents');
    }
};
