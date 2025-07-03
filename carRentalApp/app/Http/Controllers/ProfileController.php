<?php
// app/Http/Controllers/ProfileController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function profile(Request $request)
    {
        // Kthen të dhënat e përdoruesit të kyçur
        return response()->json($request->user());
    }

    public function update(Request $request)
    {
        $user = $request->user();

        // Përdor Validator në vend të $request->validate
        $validator = Validator::make($request->all(), [
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|min:6|confirmed',
             'phone' => 'nullable|string|max:20', // shto këtë
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $user->name = $request->input('name', $user->name);
        $user->email = $request->input('email', $user->email);
        $user->phone = $request->input('phone', $user->phone);  // përditëso phone-n

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json(['message' => 'Profili u përditësua me sukses.', 'user' => $user]);
    }
}
