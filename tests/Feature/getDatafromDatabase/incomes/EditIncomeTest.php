<?php

namespace Tests\Feature\getDatafromDatabase\incomes;

use App\Models\Income;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EditIncomeTest extends TestCase
{
    use RefreshDatabase;
    public function test_edit_income()
    {
        $this->withoutMiddleware();
        $income = Income::factory()->create();

        $response = $this->getJson("api/edit-income/$income->id");

        $response->assertOk();
        $response->assertJson([
            "income" => [
                "id" => $income["id"],
                "income_amount" => $income["income_amount"],
                "income_category" => $income["income_category"]
            ]
        ]);
    }

}
