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
        Schema::create('agences', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique();
            $table->string('nom');
            $table->string('phone')->unique();
            $table->string('email')->unique();
            $table->string('pays', 100);
            $table->string('adresse', 255);
            $table->string('ville', 100);
            $table->string('code_postal')->regex('/^\d{5}$/'); // 5 chiffres pour le code postal
            $table->string('numero_tva')->nullable();
            $table->enum('statut', ['activé', 'attente', 'bloqué', 'archivé'])->default('attente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agences');
    }
};
