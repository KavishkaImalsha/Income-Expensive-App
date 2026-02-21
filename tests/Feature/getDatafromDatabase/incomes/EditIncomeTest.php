<?php

namespace Tests\Feature\getDatafromDatabase\incomes;

use App\Models\Income;
use App\Models\RegisteredUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EditIncomeTest extends TestCase
{
    use RefreshDatabase;
    public function test_edit_income()
    {
        $this->withoutMiddleware();
        $user = RegisteredUser::factory()->make();
        $income = Income::factory()->create(['uuid' => $user->uuid]);

        $response = $this->getJson("api/edit-income/$income->id/$user->uuid");

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
