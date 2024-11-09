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
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('reference', 10)->unique(); // code de référence unique, max 10 caractères
            $table->enum('civilite', ['Mr', 'Mme', 'Mlle', 'Autre'])->default('Autre'); // civilité avec choix limités
            $table->string('nom', 100);
            $table->string('prenom', 100);
            $table->string('email', 255)->unique();
            $table->string('phone', 20)->unique();
            $table->date('date_naissance'); // date de naissance
            $table->string('pays', 100);
            $table->string('adress', 255);  // adresse
            $table->string('ville', 100);
            $table->string('code_postal', 10);
            $table->enum('statut', ['activé', 'attente', 'bloqué', 'archivé'])->default('attente'); // statut par défaut
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
