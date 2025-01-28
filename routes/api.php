<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\RegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::post('/add-registered-user', [RegisteredUserController::class, 'addRegisteredUser']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/add-income', [IncomeController::class, 'addIncome']);
    Route::post('/add-expense', [ExpenseController::class, 'addExpense']);
    Route::post('/add-category', [CategoryController::class, 'addCategory']);
    Route::post('/change-password', [RegisteredUserController::class, 'changePassword']);

    Route::get('/get-categories', [CategoryController::class, 'getCategories']);
    Route::get('/edit-category/{category_id}', [CategoryController::class, 'editCategory']);
    Route::get('/get-incomes', [IncomeController::class, 'getIncomes']);
    Route::get('/edit-income/{income_id}', [IncomeController::class, 'editIncome']);
    Route::get('/get-expenses', [ExpenseController::class, 'getExpenses']);
    Route::get('/edit-expense/{expense_id}', [ExpenseController::class, 'editExpense']);
    Route::get('/get-month-income',[IncomeController::class, 'getMonthIncome']);
    Route::get('/get-monthly-expense', [ExpenseController::class, 'getMonthlyExpense']);
    Route::get('/get-current-month-incomes', [IncomeController::class, 'getCurrentMonthIncomes']);
    Route::get('/get-current-month-expense', [ExpenseController::class, 'getCurrentMonthExpenses']);

    Route::put('/update-category/{category_id}', [CategoryController::class, 'updateCategory']);
    Route::put('/update-income/{income_id}', [IncomeController::class, 'updateIncome']);
    Route::put('update-expense/{expense_id}', [ExpenseController::class, 'updateExpense']);

    Route::delete('/delete-category/{category_id}', [CategoryController::class, 'deleteCategory']);
    Route::delete('/delete-income/{income_id}', [IncomeController::class, 'deleteIncome']);
    Route::delete('/delete-expense/{expense_id}', [ExpenseController::class, 'deleteExpense']);
});
