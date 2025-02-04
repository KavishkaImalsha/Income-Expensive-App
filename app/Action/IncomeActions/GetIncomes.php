<?php

namespace App\Action\IncomeActions;

use App\Models\Income;

class GetIncomes
{
    public function __invoke($user_id): array
    {
        $incomes = Income::where('uuid', $user_id)->get();

        return [
            "incomes" => $incomes
        ];
    }
}
