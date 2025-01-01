<?php

namespace App\Action\IncomeActions;

use App\Models\Income;

class EditIncome
{
    public function __invoke($income_id)
    {
        $income = Income::find($income_id);

        return [
            "income" => $income
        ];
    }
}
