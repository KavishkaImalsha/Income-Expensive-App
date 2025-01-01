<?php

namespace Tests\Feature\getDatafromDatabase\Expenses;


use App\Models\Expense;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GetExpensesTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_all_expenses_in_the_database()
    {
        $expenses = Expense::factory()->count(3)->create();

        $response = $this->getJson('api/get-expenses');

        $response->assertOk();
        $response->assertJsonStructure([
            "expenses"
        ]);
    }
}
