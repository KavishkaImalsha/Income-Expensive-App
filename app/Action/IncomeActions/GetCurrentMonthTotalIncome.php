<?php

namespace App\Action\IncomeActions;

use App\Models\Income;

class GetCurrentMonthTotalIncome
{
    public function __invoke(): array
    {
        $currentYear = now()->year;
        $currentMonth = now()->month;

        $currentMonthIncomes = Income::whereYear('created_at', $currentYear)->whereMonth('created_at', $currentMonth)->get();
        $currentMonthTotalIncome = $currentMonthIncomes->sum('income_amount');
        return [
            "total_income" => $currentMonthTotalIncome
        ];
    }
}
