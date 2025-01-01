<?php

namespace App\Action\ExpenseActions;

use App\Models\Expense;

class DeleteExpense
{
    public function __invoke($expense_id): array
    {
        $expense = Expense::find($expense_id);
        $expense->delete();

        return [
            "message" => "Expense is successfully deleted"
        ];
    }
}
