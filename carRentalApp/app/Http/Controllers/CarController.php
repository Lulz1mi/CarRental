<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Kthen të gjitha makinat nga databaza
        return Car::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validimi i të dhënave të dërguara nga klienti
        $data = $request->validate([
            'Brand'         => 'required|string',
            'Model'         => 'required|string',
            'Year'          => 'required|integer',
            'price_per_day' => 'required|numeric',
            'fuel_type'     => 'required|string',
            'transmission'  => 'required|string',
            'image_url'     => 'nullable|url',
        ]);

        // Krijo një makinë të re dhe ruaj në databazë
        return Car::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Kërko makinën me id dhe ktheje
        $car = Car::findOrFail($id); // Kërkon makinën ose kthen 404 nëse nuk e gjen
        return $car;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validimi i të dhënave të reja për makinë
        $data = $request->validate([
            'Brand'         => 'sometimes|required|string',
            'Model'         => 'sometimes|required|string',
            'Year'          => 'sometimes|required|integer',
            'price_per_day' => 'sometimes|required|numeric',
            'fuel_type'     => 'sometimes|required|string',
            'transmission'  => 'sometimes|required|string',
            'image_url'     => 'nullable|url',
        ]);

        // Kërko makinën me ID dhe përditësoje
        $car = Car::findOrFail($id);
        $car->update($data);

        // Kthe makinën e përditësuar
        return $car;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Kërko makinën me ID dhe fshije
        $car = Car::findOrFail($id);
        $car->delete();

        // Kthe një përgjigje të suksesshme
        return response()->json(['message' => 'Car deleted successfully'], 200);
    }
}
