<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

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
            'brand' => 'required|string|max:255',         // Ndryshimi nga 'Brand' në 'brand'
            'model' => 'required|string|max:255',         // Ndryshimi nga 'Model' në 'model'
            'year' => 'required|integer|min:1900|max:' . date('Y'),
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
    $updated = DB::table('cars')->where('id', $id)->update([
        'brand' => $request->brand,
        'model' => $request->model,
        'year' => $request->year,
        'price_per_day' => $request->price_per_day,
        'fuel_type' => $request->fuel_type,
        'transmission' => $request->transmission,
        'image_url' => $request->image_url,
    ]);

    return response()->json([
        'message' => $updated ? 'Car updated successfully' : 'Update failed',
        'updated' => $updated
    ]);
}


    // Fshij një veturë
// public function destroy($id)
// {
//     $car = Car::find($id);

//     if (!$car) {
//         return response()->json(['message' => 'Car not found'], 404);
//     }

//     try {
//         // Fshirje e përhershme nëse ka SoftDeletes
//         $car->forceDelete();

//         return response()->json(['message' => 'Car deleted successfully']);
//     } catch (\Exception $e) {
//         // Logojmë gabimin në log file për analizë
//         Log::error('Car deletion failed: '.$e->getMessage());

//         return response()->json([
//             'message' => 'Failed to delete car',
//             'error' => $e->getMessage()
//         ], 500);
//     }
// }
public function destroy($id)
{
    $deleted = DB::table('cars')->where('id', $id)->delete();

    if ($deleted) {
        return response()->json(['message' => 'Car deleted successfully']);
    } else {
        return response()->json(['message' => 'Car not found or not deleted'], 404);
    }
}
}
