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
        $expenses = Expense::factory()->count(5)->create();
        $currentYear = now()->year;
        $currentMonth = now()->month;
        $currentMonthExpense = $expenses->filter(function ($expense) use ($currentYear, $currentMonth) {
            return $expense->created_at->year === $currentYear && $expense->created_at->month === $currentMonth;
        });

        $response = $this->getJson('api/get-current-month-expense');

        $response->assertOk();
        $response->assertJson([
            "expenses" => $currentMonthExpense->toArray()
        ]);
    }
}
