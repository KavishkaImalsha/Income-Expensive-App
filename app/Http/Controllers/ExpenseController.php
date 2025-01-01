<?php

namespace App\Http\Controllers;

use App\Action\ExpenseActions\AddExpense;
use App\Action\ExpenseActions\EditExpense;
use App\Action\ExpenseActions\GetExpenses;
use App\Http\Requests\ExpenseRequest;
use App\Models\Expense;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use function MongoDB\BSON\toJSON;

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
}
