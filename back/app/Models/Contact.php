<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference',
        'civilite',
        'nom',
        'prenom',
        'email',
        'phone',
        'date_naissance',
        'pays',
        'adress',
        'ville',
        'code_postal',
        'statut',
    ];
}
