<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\IncomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/add-income', [IncomeController::class, 'addIncome']);
Route::post('/add-expense', [ExpenseController::class, 'addExpense']);
Route::post('/add-category', [CategoryController::class, 'addCategory']);

Route::get('/get-categories', [CategoryController::class, 'getCategories']);
Route::get('/edit-category/{category_id}', [CategoryController::class, 'editCategory']);
Route::get('/get-incomes', [IncomeController::class, 'getIncomes']);
Route::get('/edit-income/{income_id}', [IncomeController::class, 'editIncome']);
Route::get('/get-expenses', [ExpenseController::class, 'getExpenses']);

Route::put('/update-category/{category_id}', [CategoryController::class, 'updateCategory']);
Route::put('/update-income/{income_id}', [IncomeController::class, 'updateIncome']);

Route::delete('/delete-category/{category_id}', [CategoryController::class, 'deleteCategory']);
Route::delete('/delete-income/{income_id}', [IncomeController::class, 'deleteIncome']);
