<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agence extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference',
        'nom',
        'phone',
        'email',
        'pays',
        'adresse',
        'ville',
        'code_postal',
        'numero_tva',
        'statut',
    ];
}
