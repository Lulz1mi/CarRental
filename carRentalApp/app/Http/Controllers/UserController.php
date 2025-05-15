<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index()
    {
        // Merr të gjithë përdoruesit nga tabela users
        $users = DB::table('users')
            ->select('Id', 'Name', 'Email', 'Phone', 'Role')
            ->get();

        // Kthe përdoruesit në format JSON
        return response()->json($users);
    }
}
