<?php

namespace App\Action\ExpenseActions;

use App\Models\Expense;

class AddExpense
{
    public function __invoke($validateRequest, $user_id): array
    {
        Expense::create([
            'uuid' => $user_id,
            'expense_amount' => $validateRequest['expense_amount'],
            'expense_category' => $validateRequest['expense_category']
        ]);

        return [
            'message' => 'Expense insert successfully'
        ];

    }

}
