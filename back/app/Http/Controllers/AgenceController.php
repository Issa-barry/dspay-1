<?php

namespace App\Http\Controllers;

use App\Models\Agence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AgenceController extends Controller
{
    /**
     * Display a listing of the agences.
     */
    public function index()
    {
        return response()->json(Agence::all(), 200);
    }

    /**
     * Store a newly created agence.
     */
    public function store(Request $request)
    {
        // Générer une référence unique pour l'agence
        $reference = strtoupper(substr(md5(uniqid(rand(), true)), 0, 5));

        // Valider les données d'entrée
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:100',
            'phone' => 'required|numeric|unique:agences,phone',
            'email' => 'required|string|email|max:255|unique:agences,email',
            'pays' => 'required|string|max:100',
            'adresse' => 'required|string|max:255',
            'ville' => 'required|string|max:100',
            'code_postal' => 'required|string|regex:/^\d{5}$/', // Format 5 chiffres pour code postal
            'numero_tva' => 'nullable|string|max:100',
            'statut' => 'in:active,attente,blocke,archive',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Créer l'agence
        $agence = Agence::create(array_merge(
            $request->all(),
            ['reference' => $reference]
        ));

        return response()->json($agence, 201);
    }

    /**
     * Display the specified agence.
     */
    public function show($id)
    {
        $agence = Agence::find($id);

        if (!$agence) {
            return response()->json(['message' => 'Agence not found'], 404);
        }

        return response()->json($agence, 200);
    }

    /**
     * Update the specified agence.
     */
    public function update(Request $request, $id)
    {
        $agence = Agence::find($id);

        if (!$agence) {
            return response()->json(['message' => 'Agence not found'], 404);
        }

        // Valider les données d'entrée pour la mise à jour
        $validator = Validator::make($request->all(), [
            'nom' => 'string|max:100',
            'phone' => 'numeric|unique:agences,phone,' . $id,
            'email' => 'string|email|max:255|unique:agences,email,' . $id,
            'pays' => 'string|max:100',
            'adresse' => 'string|max:255',
            'ville' => 'string|max:100',
            'code_postal' => 'string|regex:/^\d{5}$/',
            'numero_tva' => 'nullable|string|max:100',
            'statut' => 'in:active,attente,blocke,archive',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Mettre à jour l'agence
        $agence->update($request->all());

        return response()->json($agence, 200);
    }

    /**
     * Remove the specified agence.
     */
    public function destroy($id)
    {
        $agence = Agence::find($id);

        if (!$agence) {
            return response()->json(['message' => 'Agence not found'], 404);
        }

        $agence->delete();

        return response()->json(['message' => 'Agence deleted successfully'], 200);
    }
}
