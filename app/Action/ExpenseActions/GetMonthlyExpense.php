<?php

namespace App\Action\ExpenseActions;

use App\Models\Expense;

class GetMonthlyExpense
{
    public function __invoke(): array
    {
        $monthlyExpense = Expense::whereYear('created_at' ,now()->year)->whereMonth( 'created_at', now()->month)->get();
        $totalExpense = $monthlyExpense->sum('expense_amount');

        return [
            "total_expense" => $totalExpense
        ];
    }
}
