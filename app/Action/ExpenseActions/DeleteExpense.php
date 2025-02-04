<?php

namespace App\Action\ExpenseActions;

use App\Models\Expense;
use Illuminate\Support\Facades\Log;

class DeleteExpense
{
    public function __invoke($expense_id, $user_id): array
    {
        $expense = Expense::where('id', $expense_id)
            ->where('uuid', $user_id)
            ->first();
        $expense->delete();
        Log::info($expense);
        return [
            "message" => "Expense is successfully deleted",
            "expense_category" => $expense->expense_category,
            "expense_amount" => $expense->expense_amount
        ];
    }
}
