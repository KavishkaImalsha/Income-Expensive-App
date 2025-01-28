<?php

namespace Tests\Feature\getDatafromDatabase\Expenses;


use App\Models\Expense;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GetMonthlyExpensesAmountTest extends TestCase
{
    use RefreshDatabase;
    public function test_get_monthly_expense()
    {
        $this->withoutMiddleware();
        $expenses = Expense::factory()->count(5)->create([
            "created_at" => Carbon::create(2025, 1, rand(1, 30)),
        ]);
        $currentYear = now()->year;
        $currentMonth = now()->month;
        $getMonthlyExpense = $expenses->filter(function ($expense) use ($currentYear, $currentMonth) {
            return $expense->created_at->year === $currentYear && $expense->created_at->month === $currentMonth;
        });
        $getTotalMonthlyExpense = $getMonthlyExpense->sum('expense_amount');

        $response = $this->getJson('api/get-monthly-expense');

        $response->assertOk();
        $response->assertJson([
            "total_expense" => $getTotalMonthlyExpense
        ]);
    }
}
