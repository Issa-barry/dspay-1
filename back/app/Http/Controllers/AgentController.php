<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Agent;

class AgentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Agent::all(), 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $reference = strtoupper(substr(md5(uniqid(rand(), true)), 0, 4));

        $request->validate([
            'nom' => 'required|string|max:100',
          'prenom' => 'required|string|max:100',
          'email' => 'required|string|email|max:255|unique:agents,email',
         'phone' => 'required|numeric|unique:agents,phone',
         'pays' => 'required|string|max:100',
        'adresse' => 'required|string|max:255',
        'ville' => 'required|string|max:100',
        'code_postal' => 'required|string|regex:/^\d{5}$/', // Format 5 chiffres
        'statut' => 'required|in:active,blocke,attente',
        ]);

        // $agent = Agent::create($request->all());
        $agent = Agent::create([
            'reference' => $reference,
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'phone' => $request->phone,
            'pays' => $request->pays,
            'adresse' => $request->adresse,
            'ville' => $request->ville,
            'code_postal' => $request->code_postal,
            'statut' => $request->statut,
        ]);
    
        return response()->json($agent, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $agent = Agent::findOrFail($id);
        return response()->json($agent, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $agent = Agent::findOrFail($id);

        $request->validate([
            'nom' => 'sometimes|string|max:255',
            'prenom' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:agents,email,' . $agent->id,
            'phone' => 'sometimes|string|max:20',
            'adresse' => 'sometimes|string|max:255',
            'statut' => 'sometimes|in:active,blocke,attente',
        ]);

        $agent->update($request->all());
        return response()->json($agent, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $agent = Agent::findOrFail($id);
        $agent->delete();
        return response()->json(null, 204);
    }
}
