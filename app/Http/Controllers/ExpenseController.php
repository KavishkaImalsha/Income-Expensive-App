<?php

namespace App\Http\Controllers;

use App\Action\ExpenseActions\AddExpense;
use App\Http\Requests\ExpenseRequest;
use App\Models\Expense;
use Illuminate\Http\Request;
use function MongoDB\BSON\toJSON;

class ExpenseController extends Controller
{
    public function addExpense(ExpenseRequest $request, AddExpense $addExpense): \Illuminate\Http\JsonResponse
    {
        $validateRequest = $request->validated();

        return response()->json($addExpense($validateRequest));
    }
}
