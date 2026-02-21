<?php

namespace Tests\Feature\getDatafromDatabase\Expenses;


use App\Models\Expense;
use App\Models\RegisteredUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GetExpensesTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_all_expenses_in_the_database()
    {
        $this->withoutMiddleware();
        $user = RegisteredUser::factory()->make();
        $expenses = Expense::factory()->count(3)->create(['uuid' => $user->uuid]);

        $response = $this->getJson("api/get-expenses/$user->uuid");

        $response->assertOk();
        $response->assertJsonStructure([
            "expenses"
        ]);
    }
}
