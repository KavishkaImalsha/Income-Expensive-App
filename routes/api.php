<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\RecentActivityController;
use App\Http\Controllers\RegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::post('/add-registered-user', [RegisteredUserController::class, 'addRegisteredUser']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/add-income/{user_id}', [IncomeController::class, 'addIncome']);
    Route::post('/add-expense/{user_id}', [ExpenseController::class, 'addExpense']);
    Route::post('/add-category/{user_id}', [CategoryController::class, 'addCategory']);
    Route::post('/change-password', [RegisteredUserController::class, 'changePassword']);
    Route::post('/add-recent-activity', [RecentActivityController::class, 'addRecentActivity']);

    Route::get('/get-categories/{user_id}', [CategoryController::class, 'getCategories']);
    Route::get('/edit-category/{category_id}/{user_id}', [CategoryController::class, 'editCategory']);
    Route::get('/get-incomes/{user_id}', [IncomeController::class, 'getIncomes']);
    Route::get('/edit-income/{income_id}/{user_id}', [IncomeController::class, 'editIncome']);
    Route::get('/get-expenses/{user_id}', [ExpenseController::class, 'getExpenses']);
    Route::get('/edit-expense/{expense_id}/{user_id}', [ExpenseController::class, 'editExpense']);
    Route::get('/get-month-income/{user_id}',[IncomeController::class, 'getMonthIncome']);
    Route::get('/get-monthly-expense/{user_id}', [ExpenseController::class, 'getMonthlyExpense']);
    Route::get('/get-current-month-incomes/{user_id}', [IncomeController::class, 'getCurrentMonthIncomes']);
    Route::get('/get-current-month-expense/{user_id}', [ExpenseController::class, 'getCurrentMonthExpenses']);
    Route::get('/get-recent-activities/{user_id}', [RecentActivityController::class, 'getRecentActivities']);

    Route::put('/update-category/{category_id}/{user_id}', [CategoryController::class, 'updateCategory']);
    Route::put('/update-income/{income_id}/{user_id}', [IncomeController::class, 'updateIncome']);
    Route::put('/update-expense/{expense_id}/{user_id}', [ExpenseController::class, 'updateExpense']);
    Route::put('/change-user-details/{user_id}', [RegisteredUserController::class, 'changeUserDetails']);

    Route::delete('/delete-category/{category_id}/{user_id}', [CategoryController::class, 'deleteCategory']);
    Route::delete('/delete-income/{income_id}/{user_id}', [IncomeController::class, 'deleteIncome']);
    Route::delete('/delete-expense/{expense_id}/{user_id}', [ExpenseController::class, 'deleteExpense']);
});
