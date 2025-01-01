<?php

namespace App\Action\ExpenseActions;

use App\Models\Expense;

class EditExpense
{
    public function __invoke($expense_id): array
    {
        $expense = Expense::find($expense_id);

        return [
            "expense" => $expense
        ];
    }
}
