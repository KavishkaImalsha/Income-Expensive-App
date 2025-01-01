<?php

namespace App\Action\IncomeActions;

use App\Models\Income;

class UpdateIncome
{
    public function __invoke($validatedRequest, $income_id)
    {
        $existingIncome = Income::find($income_id);
        $existingIncome->income_amount = $validatedRequest["income_amount"];
        $existingIncome->income_category = $validatedRequest["income_category"];
        $existingIncome->save();

        return [
            "message" => "Income is successfully updated"
        ];
    }

}
