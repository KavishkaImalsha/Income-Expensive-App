<?php

namespace App\Action\IncomeActions;

use App\Models\Income;

class EditIncome
{
    public function __invoke($income_id, $user_id)
    {
        $income = Income::where('uuid', $user_id)
            ->where('id', $income_id)
            ->first();

        return [
            "income" => $income
        ];
    }
}
