<?php

namespace App\Action\IncomeActions;

use App\Models\Income;

class DeleteIncome
{
    public function __invoke($income_id): array
    {
        $income = Income::find($income_id);
        $income->delete();

        return [
            "message" => "Income is successfully deleted",
            "income_category" => $income->income_category,
            "income_amount" => $income->income_amount
        ];
    }
}
