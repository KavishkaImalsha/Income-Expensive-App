<?php

namespace App\Action\ExpenseActions;

use App\Models\Expense;
use Illuminate\Support\Facades\Log;

class DeleteExpense
{
    public function __invoke($expense_id): array
    {
        $expense = Expense::find($expense_id);
        $expense->delete();
        Log::info($expense);
        return [
            "message" => "Expense is successfully deleted",
            "expense_category" => $expense->expense_category,
            "expense_amount" => $expense->expense_amount
        ];
    }
}
