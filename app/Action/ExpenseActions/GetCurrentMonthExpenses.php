<?php

namespace App\Action\ExpenseActions;

use App\Models\Expense;

class GetCurrentMonthExpenses
{
    public function __invoke($user_id): array
    {
        $currentYear = now()->year;
        $currentMonth = now()->month;

        $currentMonthIncomes = Expense::whereYear('created_at', $currentYear)
            ->whereMonth('created_at', $currentMonth)
            ->where('uuid', $user_id)
            ->get();

        return [
            "expenses" => $currentMonthIncomes
        ];
    }
}
