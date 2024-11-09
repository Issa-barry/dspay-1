<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AgentController;
use App\Http\Controllers\AgenceController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\UserController;

use App\Actions\Fortify\CreateNewUser;

use App\Http\Controllers\API\AuthController;

Route::post('/register', [AuthController::class, 'register']);


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');



Route::apiResource('agents', AgentController::class); 
Route::apiResource('contacts', ContactController::class);
Route::apiResource('agences', AgenceController::class);
Route::apiResource('users', UserController::class); 
 
Route::post('/con', [UserController::class, 'login']); 
Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);
 
// Route::post('/register', function (Illuminate\Http\Request $request) {
//     $action = new CreateNewUser();
//     return response()->json($action->create($request->all()), 201);
// });


// oute::middleware('auth:sanctum')->group(function () {
    // Route::get('/users', [UserController::class, 'index']);         
    // Route::get('/users/{id}', [UserController::class, 'show']);     
    // Route::post('/users', [UserController::class, 'store']);        
    // Route::put('/users/{id}', [UserController::class, 'update']);   
    // Route::delete('/users/{id}', [UserController::class, 'destroy']);  
// });