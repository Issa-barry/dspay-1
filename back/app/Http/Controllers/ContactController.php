<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    /**
     * Display a listing of the contacts.
     */
    public function index()
    {
        return response()->json(Contact::all(), 200);
    }

    /**
     * Store a newly created contact.
     */
    public function store(Request $request)
    {
        $reference = strtoupper(substr(md5(uniqid(rand(), true)), 0, 5));

        $validator = Validator::make($request->all(), [
            'civilite' => 'in:Mr,Mme,Mlle,Autre',
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'email' => 'required|string|email|max:255|unique:contacts,email',
            'phone' => 'required|numeric|unique:contacts,phone',
            'date_naissance' => 'date|before_or_equal:today',
            'pays' => 'required|string|max:100',
            'adress' => 'required|string|max:255',
            'ville' => 'required|string|max:100',
            'code_postal' => 'required|string|max:10',
            'statut' => 'in:active,attente,bloque,archive',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $contact = Contact::create(array_merge(
            $request->all(),
            ['reference' => $reference]
        ));

        return response()->json($contact, 201);
    }

    /**
     * Display the specified contact.
     */
    public function show($id)
    {
        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json(['message' => 'Contact not found'], 404);
        }

        return response()->json($contact, 200);
    }

    /**
     * Update the specified contact.
     */
    public function update(Request $request, $id)
    {
        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json(['message' => 'Contact not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'civilite' => 'in:Mr,Mme,Mlle,Autre',
            'nom' => 'string|max:100',
            'prenom' => 'string|max:100',
            'email' => 'string|email|max:255|unique:contacts,email,' . $id,
            'phone' => 'numeric|unique:contacts,phone,' . $id,
            'date_naissance' => 'date|before_or_equal:today',
            'pays' => 'string|max:100',
            'adress' => 'string|max:255',
            'ville' => 'string|max:100',
            'code_postal' => 'string|max:10',
            'statut' => 'in:active,attente,bloque,archive',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $contact->update($request->all());

        return response()->json($contact, 200);
    }

    /**
     * Remove the specified contact.
     */
    public function destroy($id)
    {
        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json(['message' => 'Contact not found'], 404);
        }

        $contact->delete();

        return response()->json(['message' => 'Contact deleted successfully'], 200);
    }
}
