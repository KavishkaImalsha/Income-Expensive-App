<?php

namespace App\Action\ExpenseActions;

use App\Models\Expense;

class UpdateExpense
{
    public function __invoke($validateExpense, $expense_id, $user_id): array
    {
        $expense = Expense::where('id', $expense_id)
            ->where('uuid', $user_id)
            ->first();
        $expense->expense_amount = $validateExpense["expense_amount"];
        $expense->expense_category = $validateExpense["expense_category"];
        $expense->save();

        return [
            "message" => "Expense was updated successfully"
        ];
    }
}
