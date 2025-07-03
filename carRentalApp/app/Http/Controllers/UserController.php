<?php

// app/Http/Controllers/UserController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Merr të gjithë përdoruesit
    public function index()
    {
        $users = DB::table('users')
            ->select('Id', 'Name', 'Email', 'Phone', 'Role')
            ->get();

        return response()->json($users);
    }

    // Fshi një përdorues
    public function destroy($id)
    {
        $deleted = DB::table('users')->where('id', $id)->delete();

        if ($deleted) {
            return response()->json(['message' => 'Përdoruesi u fshi me sukses.']);
        } else {
            return response()->json(['message' => 'Përdoruesi nuk u gjet.'], 404);
        }
    }

    // ✅ Shto një përdorues të ri
    public function store(Request $request)
{
    $validated = validator($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'phone' => 'nullable|string|max:20',
        'password' => 'required|string|min:6|confirmed',
        'role' => 'required|string|in:user,admin',
    ])->validate();

    $userId = DB::table('users')->insertGetId([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'phone' => $validated['phone'] ?? null,
        'password' => Hash::make($validated['password']),
        'role' => $validated['role'],
    ]);

    $user = DB::table('users')
        ->select('Id', 'Name', 'Email', 'Phone', 'Role')
        ->where('id', $userId)
        ->first();

    return response()->json([
        'message' => 'Përdoruesi u shtua me sukses.',
        'user' => $user
    ], 201);
}

}
