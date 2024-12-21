<?php

namespace App\Action\IncomeActions;

use App\Models\Income;

class AddIncome
{
    public function __invoke(array $validatedIncomeRequest): array
    {
        Income::create([
            'income_amount' => $validatedIncomeRequest['income_amount'],
            'income_category' => $validatedIncomeRequest['income_category']
        ]);

        return [
            'message' => "Income added successfully"
        ];
    }
}
