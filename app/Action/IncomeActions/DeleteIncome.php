<?php

namespace App\Action\IncomeActions;

use App\Models\Income;

class DeleteIncome
{
    public function __invoke($income_id, $user_id): array
    {
        $income = Income::where('id', $income_id)
            ->where('uuid', $user_id)
            ->first();
        $income->delete();

        return [
            "message" => "Income is successfully deleted",
            "income_category" => $income->income_category,
            "income_amount" => $income->income_amount
        ];
    }
}
