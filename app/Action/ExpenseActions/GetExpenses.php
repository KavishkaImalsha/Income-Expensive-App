<?php

namespace App\Action\ExpenseActions;

use App\Models\Expense;

class GetExpenses
{
    public function __invoke(): array
    {
        $expenses = Expense::all();

        return [
            "expenses" => $expenses
        ];
    }
}
