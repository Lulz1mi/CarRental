<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        $bookings = Booking::with(['car', 'user'])->orderBy('created_at', 'desc')->get();
        return response()->json($bookings);
    }

    public function allBookings()
    {
        $bookings = \DB::table('bookings')
            ->join('users', 'bookings.user_id', '=', 'users.id')
            ->join('cars', 'bookings.car_id', '=', 'cars.id')
            ->select(
                'bookings.id',
                'bookings.first_name',
                'bookings.last_name',
                'cars.brand',
                'cars.model',
                'cars.price_per_day',
                'bookings.car_id',
                'bookings.start_date',
                'bookings.end_date',
                'bookings.status',
                'bookings.total_payment'
            )
            ->orderBy('bookings.created_at', 'desc')
            ->get();

        return response()->json($bookings);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'car_id' => 'required|exists:cars,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'birth_date' => 'required|date',
            'license' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'street' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'payment_method' => 'required|string|in:cash,card',
            'total_payment' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        $booking = new Booking();
        $booking->user_id = auth()->id();
        $booking->fill($validated);
        $booking->status = 'pending';
        $booking->save();

        return response()->json(['message' => 'Rezervimi u ruajt me sukses'], 201);
    }

    public function myBookings()
    {
        $bookings = Booking::with('car')
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($bookings);
    }

    public function update(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);

        if (auth()->user()->role !== 'admin' && $booking->user_id !== auth()->id()) {
            return response()->json(['message' => 'Nuk lejohet të përditësohet ky rezervim.'], 403);
        }

        $validator = Validator::make($request->all(), [
            'car_id' => 'sometimes|exists:cars,id',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after_or_equal:start_date',
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255',
            'birth_date' => 'sometimes|date',
            'license' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|max:50',
            'street' => 'sometimes|string|max:255',
            'postal_code' => 'sometimes|string|max:20',
            'payment_method' => 'sometimes|string|in:cash,card',
            'total_payment' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|string|in:pending,confirmed,cancelled',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        if (isset($data['start_date'], $data['end_date'])) {
            $start = strtotime($data['start_date']);
            $end = strtotime($data['end_date']);
            if ($end >= $start) {
                $diffDays = ceil(($end - $start) / (60 * 60 * 24)) + 1;
                $carId = $data['car_id'] ?? $booking->car_id;
                $pricePerDay = \DB::table('cars')->where('id', $carId)->value('price_per_day');
                if ($pricePerDay) {
                    $data['total_payment'] = $diffDays * $pricePerDay;
                }
            }
        }

        $booking->update($data);

        return response()->json(['message' => 'Rezervimi u përditësua me sukses.', 'booking' => $booking]);
    }

    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);

        if (auth()->user()->role !== 'admin' && $booking->user_id !== auth()->id()) {
            return response()->json(['message' => 'Nuk lejohet të fshihet ky rezervim.'], 403);
        }

        $booking->delete();

        return response()->json(['message' => 'Rezervimi u fshi me sukses.']);
    }

    public function cancel($id)
    {
        $booking = Booking::findOrFail($id);

        if (auth()->user()->role !== 'admin' && $booking->user_id !== auth()->id()) {
            return response()->json(['message' => 'Nuk lejohet.'], 403);
        }

        $booking->status = 'cancelled';
        $booking->save();

        return response()->json(['message' => 'Rezervimi u anulua me sukses.']);
    }

    public function postpone(Request $request, $id)
    {
        // Përdor Validator::make në vend të $request->validate
        $validator = Validator::make($request->all(), [
            'end_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $booking = Booking::findOrFail($id);

        if (auth()->user()->role !== 'admin' && $booking->user_id !== auth()->id()) {
            return response()->json(['message' => 'Nuk lejohet.'], 403);
        }

        if (strtotime($request->end_date) < strtotime($booking->start_date)) {
            return response()->json(['message' => 'Data e përfundimit nuk mund të jetë para datës së fillimit.'], 422);
        }

        $booking->end_date = $request->end_date;
        $booking->save();

        return response()->json(['message' => 'Data e përfundimit u përditësua me sukses.']);
    }
}
