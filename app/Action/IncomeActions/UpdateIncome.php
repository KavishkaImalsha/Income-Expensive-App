<?php

namespace App\Action\IncomeActions;

use App\Models\Income;
use Illuminate\Support\Facades\Log;

class UpdateIncome
{
    public function __invoke($validatedRequest, $income_id, $user_id): array
    {
        $existingIncome = Income::where('id', $income_id)
            ->where('uuid', $user_id)
            ->first();
        $existingIncome->income_amount = $validatedRequest["income_amount"];
        $existingIncome->income_category = $validatedRequest["income_category"];
        $existingIncome->save();

        return [
            "message" => "Income is successfully updated"
        ];
    }

}
