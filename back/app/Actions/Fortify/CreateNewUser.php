<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Laravel\Jetstream\Jetstream;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'nom' => ['required', 'string', 'max:255'],
            'prenom' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'phone' => ['nullable', 'string', 'max:20', 'unique:users'],
            'date_naissance' => ['nullable', 'date'],
            'civilite' => ['nullable', 'in:Mr,Mme,Mlle,Autre'],
            'statut' => ['nullable', 'in:active,attente,bloque,archive'],
            'password' => $this->passwordRules(),
            'terms' => Jetstream::hasTermsAndPrivacyPolicyFeature() ? ['accepted', 'required'] : '',
        ])->validate();

        return User::create([
            'nom' => $input['nom'],
            'prenom' => $input['prenom'],
            'email' => $input['email'],
            'phone' => $input['phone'] ?? null,
            'date_naissance' => $input['date_naissance'] ?? null,
            'civilite' => $input['civilite'] ?? 'Autre',
            'statut' => $input['statut'] ?? 'attente',
            'password' => Hash::make($input['password']),
            'reference' => $this->generateReference(),
        ]);

         // Envoi forcé de l'email de vérification
         $user->sendEmailVerificationNotification();

         return $user;
    }

    /**
     * Generate a unique reference.
     */
    protected function generateReference(): string
    {
        do {
            $reference = 'RF' . mt_rand(1000, 9999);
        } while (User::where('reference', $reference)->exists());

        return $reference;
    }
}
