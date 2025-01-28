<?php

namespace Tests\Feature\getDatafromDatabase\incomes;

use App\Models\Income;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\Log;
class GetCurrentMonthIncomesTest extends TestCase
{
    use RefreshDatabase;
    public function test_get_current_month_income(){
        $this->withoutMiddleware();
        $incomes = Income::factory()->count(5)->create();
        $currentYear = now()->year;
        $currentMonth = now()->month;
        $currentMonthIncomes = $incomes->filter(function ($income) use ($currentYear, $currentMonth) {
            return $income->created_at->year === $currentYear && $income->created_at->month === $currentMonth;
        });

        $response = $this->getJson('api/get-current-month-incomes');
        $response->assertOk();
        $response->assertJson([
            "incomes" => $currentMonthIncomes->toArray()
        ]);
    }
}
