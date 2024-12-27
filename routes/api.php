<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\IncomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/add-income', [IncomeController::class, 'addIncome']);
Route::post('/add-expense', [ExpenseController::class, 'addExpense']);
Route::post('/add-category', [CategoryController::class, 'addCategory']);
