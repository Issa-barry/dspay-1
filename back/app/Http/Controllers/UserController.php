<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Actions\Fortify\CreateNewUser;
use Illuminate\Support\Facades\Auth;
 

class UserController extends Controller
{
    // Récupérer la liste des utilisateurs
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    // Récupérer les détails d'un utilisateur
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    // Créer un nouvel utilisateur
    public function store(Request $request)
    {
        $action = new CreateNewUser();

        try {
            $user = $action->create($request->all());
            return response()->json($user, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } 
    }


    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'nom' => 'required|string|max:255',
    //         'prenom' => 'required|string|max:255',
    //         'email' => 'required|string|email|max:255|unique:users',
    //         'phone' => 'nullable|string|max:20|unique:users',
    //         'date_naissance' => 'nullable|date',
    //         'civilite' => 'nullable|in:Mr,Mme,Mlle,Autre',
    //         'statut' => 'nullable|in:active,attente,bloque,archive',
    //         'password' => 'required|string|min:8',
    //     ]);

    //     $user = User::create([
    //         'nom' => $validated['nom'],
    //         'prenom' => $validated['prenom'],
    //         'email' => $validated['email'],
    //         'phone' => $validated['phone'] ?? null,
    //         'date_naissance' => $validated['date_naissance'] ?? null,
    //         'civilite' => $validated['civilite'] ?? 'Autre',
    //         'statut' => $validated['statut'] ?? 'attente',
    //         'password' => Hash::make($validated['password']),
    //         'reference' => $this->generateReference(),
    //     ]);

    //     return response()->json($user, 201);
    // }

    // Mettre à jour un utilisateur existant
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'prenom' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $id,
            'phone' => 'sometimes|string|max:20|unique:users,phone,' . $id,
            'date_naissance' => 'nullable|date',
            'civilite' => 'nullable|in:Mr,Mme,Mlle,Autre',
            'statut' => 'nullable|in:active,attente,bloque,archive',
            'password' => 'sometimes|string|min:8',
        ]);

        $user->update(array_merge(
            $validated,
            $validated['password'] ? ['password' => Hash::make($validated['password'])] : []
        ));

        return response()->json($user);
    }

    // Supprimer un utilisateur
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    // Générer une référence unique
    protected function generateReference(): string
    {
        do {
            $reference = 'RF' . mt_rand(1000, 9999);
        } while (User::where('reference', $reference)->exists());

        return $reference;
    }


    // ************************************************AUTH*****************/
 /**
     * Handle user login.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:8',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid login credentials.',
            ], 401);
        }

        $user = Auth::user();

        // Generate a token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ], 200);
    }

    /**
     * Handle user logout.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }
}
