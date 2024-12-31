<?php

namespace App\Action\IncomeActions;

use App\Models\Income;

class GetIncomes
{
    public function __invoke(): array
    {
        $incomes = Income::all();

        return [
            "incomes" => $incomes
        ];
    }
}
