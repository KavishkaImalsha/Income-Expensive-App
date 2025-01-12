<?php

namespace App\Http\Controllers;

use App\Action\ExpenseActions\AddExpense;
use App\Action\ExpenseActions\DeleteExpense;
use App\Action\ExpenseActions\EditExpense;
use App\Action\ExpenseActions\GetExpenses;
use App\Action\ExpenseActions\GetMonthlyExpense;
use App\Action\ExpenseActions\UpdateExpense;
use App\Http\Requests\ExpenseRequest;
use App\Models\Expense;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class ExpenseController extends Controller
{
    public function addExpense(ExpenseRequest $request, AddExpense $addExpense): JsonResponse
    {
        $validateRequest = $request->validated();

        return response()->json($addExpense($validateRequest));
    }

    public function getExpenses(GetExpenses $getExpenses): JsonResponse
    {
        return response()->json($getExpenses());
    }

    public function editExpense(EditExpense $editExpense, $expense_id): JsonResponse
    {
        return response()->json($editExpense($expense_id));
    }

    public function updateExpense(ExpenseRequest $request, UpdateExpense $updateExpense, $expense_id): JsonResponse
    {
        $validateExpense = $request->validated();
        return response()->json($updateExpense($validateExpense, $expense_id));
    }

    public function deleteExpense(DeleteExpense $deleteExpense, $expense_id): JsonResponse
    {
        return response()->json($deleteExpense($expense_id));
    }

    public function getMonthlyExpense(GetMonthlyExpense $getMonthlyExpense): JsonResponse
    {
        return response()->json($getMonthlyExpense());
    }

    public function getCurrentMonthExpenses(){
        $currentYear = now()->year;
        $currentMonth = now()->month;

        $currentMonthIncomes = Expense::whereYear('created_at', $currentYear)->whereMonth('created_at', $currentMonth)->get();
        return response()->json(["expenses" => $currentMonthIncomes]);
    }
}
