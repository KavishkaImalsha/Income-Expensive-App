<?php

namespace Tests\Feature;

use App\Models\Expense;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GetCurrentMonthExpenses extends TestCase
{
    use RefreshDatabase;
    public function test_get_current_month_expenses(): void
    {
        $expense = Expense::factory()->count(5)->create()->array();

        $response = $this->getJson('api/get-current-month-expense');

        $response->assertOk();
    }
}
