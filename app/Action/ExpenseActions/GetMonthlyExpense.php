<?php

namespace App\Action\ExpenseActions;

use App\Models\Expense;

class GetMonthlyExpense
{
    public function __invoke($user_id): array
    {
        $monthlyExpense = Expense::whereYear('created_at' ,now()->year)
            ->whereMonth( 'created_at', now()->month)
            ->where('uuid', $user_id)
            ->get();
        $totalExpense = $monthlyExpense->sum('expense_amount');

        return [
            "total_expense" => $totalExpense
        ];
    }
}
