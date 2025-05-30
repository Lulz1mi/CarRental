<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
}
