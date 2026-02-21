<?php

namespace App\Action\ExpenseActions;

use App\Models\Expense;

class GetExpenses
{
    public function __invoke($user_id): array
    {
        $expenses = Expense::where('uuid', '=', $user_id)->get();

        return [
            "expenses" => $expenses
        ];
    }
}
