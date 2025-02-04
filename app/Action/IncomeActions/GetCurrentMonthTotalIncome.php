<?php

namespace App\Action\IncomeActions;

use App\Models\Income;

class GetCurrentMonthTotalIncome
{
    public function __invoke($user_id): array
    {
        $currentYear = now()->year;
        $currentMonth = now()->month;

        $currentMonthIncomes = Income::whereYear('created_at', $currentYear)
            ->whereMonth('created_at', $currentMonth)
            ->where('uuid', $user_id)
            ->get();
        $currentMonthTotalIncome = $currentMonthIncomes->sum('income_amount');
        return [
            "total_income" => $currentMonthTotalIncome
        ];
    }
}
