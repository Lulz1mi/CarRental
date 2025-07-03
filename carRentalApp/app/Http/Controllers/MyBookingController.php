<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MyBookingController extends Controller
{
    // Anulon rezervimin me id të dhënë (ndryshon statusin në 'cancelled')
    public function cancel($id)
    {
        $user = Auth::user();

        $booking = Booking::where('id', $id)->where('user_id', $user->id)->first();

        if (!$booking) {
            return response()->json(['message' => 'Rezervimi nuk u gjet'], 404);
        }

        if ($booking->status === 'cancelled') {
            return response()->json(['message' => 'Rezervimi është tashmë i anuluar'], 400);
        }

        $booking->status = 'cancelled';
        $booking->save();

        return response()->json(['message' => 'Rezervimi u anulua me sukses']);
    }

    // Shton shtyrje për datën e përfundimit të rezervimit dhe përditëson pagesën totale
    public function postpone(Request $request, $id)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json(['message' => 'Nuk jeni i autorizuar'], 401);
            }

            $booking = Booking::where('id', $id)->where('user_id', $user->id)->first();

            if (!$booking) {
                return response()->json(['message' => 'Rezervimi nuk u gjet'], 404);
            }

            $validator = Validator::make($request->all(), [
                'end_date' => 'required|date|after_or_equal:' . $booking->start_date,
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $newEndDate = $request->input('end_date');

            // Llogarit numrin e ditëve midis start_date dhe end_date të re
            $startDate = new \DateTime($booking->start_date);
            $endDate = new \DateTime($newEndDate);
            $interval = $startDate->diff($endDate);
            $days = $interval->days;

            if ($days <= 0) {
                return response()->json(['message' => 'Data e përfundimit duhet të jetë më e madhe se data e fillimit'], 422);
            }

            // Merr makinën e rezervuar (sigurohu që relacioni car() në Booking është i saktë)
            $car = $booking->car;

            if (!$car) {
                return response()->json(['message' => 'Makina nuk u gjet për këtë rezervim'], 404);
            }

            $pricePerDay = $car->price_per_day;

            // Llogarit pagesën totale të re
            $totalPayment = $days * $pricePerDay;

            // Përditëso të dhënat në rezervim
            $booking->end_date = $newEndDate;
            $booking->total_payment = $totalPayment;
            $booking->save();

            return response()->json([
                'message' => 'Rezervimi u shty me sukses',
                'total_payment' => $totalPayment,
            ]);
        } catch (\Exception $e) {
            \Log::error('Error postpone booking: ' . $e->getMessage());
            return response()->json(['message' => 'Gabim në server', 'error' => $e->getMessage()], 500);
        }
    }

    // Fshin rezervimin nga database (DELETE)
    public function destroy($id)
    {
        $user = Auth::user();

        $booking = Booking::where('id', $id)->where('user_id', $user->id)->first();

        if (!$booking) {
            return response()->json(['message' => 'Rezervimi nuk u gjet'], 404);
        }

        try {
            $booking->delete();
            return response()->json(['message' => 'Rezervimi u fshi me sukses']);
        } catch (\Exception $e) {
            \Log::error('Gabim gjatë fshirjes së rezervimit: ' . $e->getMessage());
            return response()->json(['message' => 'Gabim në server'], 500);
        }
    }
}
