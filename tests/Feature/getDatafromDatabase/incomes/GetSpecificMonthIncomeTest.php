<?php

namespace Tests\Feature\getDatafromDatabase\incomes;

use App\Models\Income;
use App\Models\RegisteredUser;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GetSpecificMonthIncomeTest extends TestCase
{
    use RefreshDatabase;
    public function test_specific_month_income_amount()
    {
        $this->withoutMiddleware();
        $user = RegisteredUser::factory()->make();
        $incomes = Income::factory()->count(20)->create([
            'created_at' => Carbon::create(2025,1, rand(1, 30)),
            'uuid' => $user->uuid
        ]);
        $currentYear = now()->year;
        $currentMonth = now()->month;
        $monthlyIncomes = $incomes->filter(function ($income) use ($currentYear, $currentMonth) {
            return $income->created_at->year === $currentYear && $income->created_at->month === $currentMonth;
        });
        $incomesTotal = $monthlyIncomes->sum("income_amount");

        $response = $this->getJson("api/get-month-income/$user->uuid");

        $response->assertOk();
        $response->assertSimilarJson([
            "total_income" => $incomesTotal
        ]);

    }

}
