<?php

namespace Tests\Feature\deleteDatabaseData\incomes;

use App\Models\Income;
use App\Models\RegisteredUser;
use Tests\TestCase;

class DeleteIncomeTest extends TestCase
{
    public function test_delete_income()
    {
        $this->withoutMiddleware();
        $user = RegisteredUser::factory()->make();
        $income = Income::factory()->create(['uuid' => $user->uuid]);

        $response = $this->deleteJson("api/delete-income/$income->id/$user->uuid");

        $response->assertOk();
        $response->assertSimilarJson([
            "message" => "Income is successfully deleted",
            "income_category" => $income->income_category,
            "income_amount" => $income->income_amount
        ]);
        $this->assertDatabaseMissing('incomes', [
            "id" => $income["id"],
            "income_amount" => $income["income_amount"],
            "income_category" => $income["income_category"]
        ]);
    }
}
