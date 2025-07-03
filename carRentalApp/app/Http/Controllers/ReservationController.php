<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use Carbon\Carbon;

class ReservationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'car_id' => 'required|integer|exists:cars,id',
            'user_name' => 'required|string|max:255',
            'user_email' => 'required|email',
            'days' => 'required|integer|min:1',
        ]);

        $startDate = Carbon::now();
        $endDate = $startDate->copy()->addDays($validated['days']);

        $reservation = new Reservation();
        $reservation->user_id = auth()->id(); // ose null nëse s’është i kyçur
        $reservation->car_id = $validated['car_id'];
        $reservation->user_name = $validated['user_name'];
        $reservation->user_email = $validated['user_email'];
        $reservation->start_date = $startDate;
        $reservation->end_date = $endDate;
        $reservation->save();

        return response()->json(['message' => 'Rezervimi u bë me sukses'], 201);
    }
}
