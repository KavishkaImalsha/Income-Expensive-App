<?php

use App\Http\Controllers\IncomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('add-income', [IncomeController::class, 'addIncome']);
