<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Enums\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Regjistrimi i përdoruesve
   public function register(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:8|confirmed',
        'phone' => 'nullable|string|max:20',
        // Heqim 'role' nga validimi
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $validated = $validator->validated();

    $user = User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => Hash::make($validated['password']),
        'phone' => $validated['phone'] ?? null,
        'role' => 'user', // Vendosim gjithmonë rolin "user"
    ]);

    $token = $user->createToken('api-token')->plainTextToken;

    return response()->json([
        'user' => $user,
        'token' => $token,
    ], 201);
}

    // Login i përdoruesve
   public function login(Request $request)
{
    // Validimi i të dhënave
    $validator = Validator::make($request->all(), [
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors()
        ], 422);
    }

    // Gjej përdoruesin me email
    $user = \App\Models\User::where('email', $request->email)->first();

    // Kontrolloni që përdoruesi është i gjetur
    if (!$user) {
        return response()->json([
            'message' => 'Përdoruesi nuk u gjet.'
        ], 404);
    }

    // Kontrolloni që fjalëkalimi është i saktë
    if (!Hash::check($request->password, $user->password)) {
        return response()->json([
            'message' => 'Të dhënat e hyrjes janë të pasakta. Fjalëkalimi nuk përputhet.'
        ], 401);
    }

    // Krijo token-in
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'access_token' => $token,
        'token_type' => 'Bearer',
        'user' => $user,
    ]);
}

    // Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }

    // Profil i përdoruesit
    public function profile(Request $request)
    {
        return response()->json($request->user());
    }
}
