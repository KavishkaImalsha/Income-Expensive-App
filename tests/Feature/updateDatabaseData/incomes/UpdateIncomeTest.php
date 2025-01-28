<?php

namespace Tests\Feature\updateDatabaseData\incomes;

use App\Models\Income;
use Tests\TestCase;

class UpdateIncomeTest extends TestCase
{
    public function test_update_income()
    {
        $this->withoutMiddleware();
        $existingIncome = Income::factory()->create();
        $newIncome = Income::factory()->make()->toArray();

        $response = $this->putJson("api/update-income/$existingIncome->id", $newIncome);

        $response->assertOk();
        $response->assertSimilarJson([
            "message" => "Income is successfully updated"
        ]);
        $this->assertDatabaseHas("incomes",[
            "id" => $existingIncome["id"],
            "income_amount" => $newIncome["income_amount"],
            "income_category" => $newIncome["income_category"]
        ]);
    }
}
