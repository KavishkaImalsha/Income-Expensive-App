<?php

namespace Tests\Feature\deleteDatabaseData\incomes;

use App\Models\Income;
use Tests\TestCase;

class DeleteIncomeTest extends TestCase
{
    public function test_delete_income()
    {
        $income = Income::factory()->create();

        $response = $this->deleteJson("api/delete-income/$income->id");

        $response->assertOk();
        $response->assertSimilarJson([
            "message" => "Income is successfully deleted"
        ]);
        $this->assertDatabaseMissing('incomes', [
            "id" => $income["id"],
            "income_amount" => $income["income_amount"],
            "income_category" => $income["income_category"]
        ]);
    }
}
