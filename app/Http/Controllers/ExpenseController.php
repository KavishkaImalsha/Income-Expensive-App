<?php

namespace App\Http\Controllers;

use App\Action\ExpenseActions\AddExpense;
use App\Action\ExpenseActions\DeleteExpense;
use App\Action\ExpenseActions\EditExpense;
use App\Action\ExpenseActions\GetExpenses;
use App\Http\Requests\ExpenseRequest;
use Illuminate\Http\JsonResponse;

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

    public function deleteExpense(DeleteExpense $deleteExpense, $expense_id): JsonResponse
    {
        return response()->json($deleteExpense($expense_id));
    }
}
