<?php

namespace Tests\Feature\getDatafromDatabase\incomes;



use App\Models\Income;
use App\Models\RegisteredUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GetIncomesTest extends TestCase
{
    use RefreshDatabase;
    public function test_get_incomes_from_database()
    {
        $this->withoutMiddleware();
        $user = RegisteredUser::factory()->make();
        $incomes = Income::factory()->create(['uuid' => $user->uuid]);

        $response = $this->getJson("api/get-incomes/$user->uuid");

        $response->assertOk();
        $response->assertJson([
           "incomes" => [[
                "income_amount" => $incomes["income_amount"],
               "income_category" => $incomes["income_category"]
           ]]
        ]);
    }
}
