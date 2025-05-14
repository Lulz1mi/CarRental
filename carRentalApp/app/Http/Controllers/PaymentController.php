<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{
    // Merr të gjitha pagesat
    public function index()
    {
        $payments = Payment::all();
        return response()->json($payments);
    }

    // Ruaj një pagesë të re
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'rental_id' => 'required|integer',
            'car_id' => 'required|integer',
            'user_id' => 'required|integer',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string|max:50',
            'status' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $payment = Payment::create($validator->validated());

        return response()->json($payment, 201);
    }

    // Shfaq një pagesë sipas ID-së
    public function show($id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        return response()->json($payment);
    }

    // Përditëso një pagesë ekzistuese
    public function update(Request $request, $id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'rental_id' => 'required|integer',
            'car_id' => 'required|integer',
            'user_id' => 'required|integer',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string|max:50',
            'status' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $payment->update($validator->validated());

        return response()->json($payment);
    }

    // Fshij një pagesë
    public function destroy($id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        $payment->delete();

        return response()->json(['message' => 'Payment deleted successfully']);
    }
}
