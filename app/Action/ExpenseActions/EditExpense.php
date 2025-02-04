<?php

namespace App\Action\ExpenseActions;

use App\Models\Expense;

class EditExpense
{
    public function __invoke($expense_id, $user_id): array
    {
        $expense = Expense::where('uuid' , $user_id)
            ->where('id', $expense_id)
            ->first();

        return [
            "expense" => $expense
        ];
    }
}
