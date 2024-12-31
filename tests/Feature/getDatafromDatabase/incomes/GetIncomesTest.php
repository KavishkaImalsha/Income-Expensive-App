<?php

namespace Tests\Feature\getDatafromDatabase\incomes;



use App\Models\Income;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GetIncomesTest extends TestCase
{
    use RefreshDatabase;
    public function test_get_incomes_from_database()
    {
        $incomes = Income::factory()->create();

        $response = $this->getJson('api/get-incomes');

        $response->assertOk();
        $response->assertJson([
           "incomes" => [[
                "income_amount" => $incomes["income_amount"],
               "income_category" => $incomes["income_category"]
           ]]
        ]);
    }
}
