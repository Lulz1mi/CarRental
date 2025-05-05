<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CarController extends Controller
{
    // Merr të gjitha veturat
    public function index()
    {
        $cars = Car::all();
        return response()->json($cars);
    }

    // Ruaj një veturë të re
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'Brand' => 'required|string|max:255',
            'Model' => 'required|string|max:255',
            'Year' => 'required|integer|min:1900|max:' . date('Y'),
            'price_per_day' => 'required|numeric|min:0',
            'fuel_type' => 'required|string|max:50',
            'transmission' => 'required|string|max:50',
            'image_url' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $car = Car::create($validator->validated());

        return response()->json($car, 201);
    }

    // Shfaq një veturë sipas ID-së
    public function show($id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json(['message' => 'Car not found'], 404);
        }

        return response()->json($car);
    }

    // Përditëso një veturë ekzistuese
    public function update(Request $request, $id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json(['message' => 'Car not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'Brand' => 'sometimes|required|string|max:255',
            'Model' => 'sometimes|required|string|max:255',
            'Year' => 'sometimes|required|integer|min:1900|max:' . date('Y'),
            'price_per_day' => 'sometimes|required|numeric|min:0',
            'fuel_type' => 'sometimes|required|string|max:50',
            'transmission' => 'sometimes|required|string|max:50',
            'image_url' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $car->update($validator->validated());

        return response()->json($car);
    }

    // Fshij një veturë
    public function destroy($id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json(['message' => 'Car not found'], 404);
        }

        $car->forceDelete();


        return response()->json(['message' => 'Car deleted successfully']);
    }
}
