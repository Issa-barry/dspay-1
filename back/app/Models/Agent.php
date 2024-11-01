<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{
    use HasFactory;

    protected $fillable = [
    'reference',
    'nom', 
    'prenom', 
    'email', 
    'phone',
    'pays',
    'adresse', 
    'ville',
    'code_postal',
    'statut'
   ];

}
