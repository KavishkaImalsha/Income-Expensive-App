<?php

namespace Tests\Feature\updateDatabaseData\expenses;


use App\Models\Expense;
use App\Models\RegisteredUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UpdateExpenseTest extends TestCase
{
    use RefreshDatabase;
    public function test_update_expense()
    {
        $this->withoutMiddleware();
        $user = RegisteredUser::factory()->make();
        $existingExpense = Expense::factory()->create(['uuid' => $user->uuid]);
        $newExpense = Expense::factory()->make()->toArray();

        $response = $this->putJson("api/update-expense/$existingExpense->id/$user->uuid", $newExpense);

        $response->assertOk();
        $response->assertSimilarJson([
            "message" => "Expense was updated successfully"
        ]);
        $this->assertDatabaseHas("expenses", [
            "id" => $existingExpense["id"],
            "expense_amount" => $newExpense["expense_amount"],
            "expense_category" => $newExpense["expense_category"]
        ]);
    }
}
