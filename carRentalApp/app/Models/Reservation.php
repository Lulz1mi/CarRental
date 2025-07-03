<?php

{
    $request->validate([
        'car_id' => 'required|exists:cars,id',
        'start_date' => 'required|date',
        'end_date' => 'required|date|after_or_equal:start_date',
    ]);

    $reservation = Reservation::create([
        'user_id' => auth()->id(),
        'car_id' => $request->car_id,
        'start_date' => $request->start_date,
        'end_date' => $request->end_date,
        'status' => 'pending',
    ]);

    return response()->json(['message' => 'Rezervimi u krijua me sukses!', 'reservation' => $reservation], 201);
}
