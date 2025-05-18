<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;


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
            'message' => 'Validation failed',
            'errors' => $validator->errors()
        ], 422);
    }

    $updated = DB::table('payments')->where('Payment_id', $id)->update($validator->validated());

    return response()->json([
        'message' => $updated ? 'Payment updated successfully' : 'Update failed',
        'updated' => $updated
    ]);
}


    // Fshij një pagesë
    public function destroy($id)
{
    $deleted = DB::table('payments')->where('payment_id', $id)->delete();

    if ($deleted) {
        return response()->json(['message' => 'Payment deleted successfully']);
    } else {
        return response()->json(['message' => 'Payment not found or not deleted'], 404);
    }
}
}