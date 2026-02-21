<?php

namespace App\Http\Controllers;

use App\Action\ExpenseActions\AddExpense;
use App\Action\ExpenseActions\DeleteExpense;
use App\Action\ExpenseActions\EditExpense;
use App\Action\ExpenseActions\GetCurrentMonthExpenses;
use App\Action\ExpenseActions\GetExpenses;
use App\Action\ExpenseActions\GetMonthlyExpense;
use App\Action\ExpenseActions\UpdateExpense;
use App\Http\Requests\ExpenseRequest;
use App\Models\Expense;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class ExpenseController extends Controller
{
    public function addExpense(ExpenseRequest $request, AddExpense $addExpense, $user_id): JsonResponse
    {
        $validateRequest = $request->validated();

        return response()->json($addExpense($validateRequest, $user_id));
    }

    public function getExpenses($user_id ,GetExpenses $getExpenses): JsonResponse
    {
        return response()->json($getExpenses($user_id));
    }

    public function editExpense(EditExpense $editExpense, $expense_id, $user_id): JsonResponse
    {
        return response()->json($editExpense($expense_id, $user_id));
    }

    public function updateExpense(ExpenseRequest $request, UpdateExpense $updateExpense, $expense_id, $user_id): JsonResponse
    {
        $validateExpense = $request->validated();
        return response()->json($updateExpense($validateExpense, $expense_id, $user_id));
    }

    public function deleteExpense(DeleteExpense $deleteExpense, $expense_id, $user_id): JsonResponse
    {
        return response()->json($deleteExpense($expense_id, $user_id));
    }

    public function getMonthlyExpense($user_id ,GetMonthlyExpense $getMonthlyExpense): JsonResponse
    {
        return response()->json($getMonthlyExpense($user_id));
    }

    public function getCurrentMonthExpenses($user_id, GetCurrentMonthExpenses $getCurrentMonthExpenses): JsonResponse
    {
        return response()->json($getCurrentMonthExpenses($user_id));
    }
}
