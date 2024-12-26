<?php

namespace App\Action\ExpenseActions;

use App\Models\Expense;

class AddExpense
{
    public function __invoke($validateRequest): array
    {
        Expense::create([
            'expense_amount' => $validateRequest['expense_amount'],
            'expense_category' => $validateRequest['expense_category']
        ]);

        return [
            'message' => 'Expense insert successfully'
        ];

    }

}
