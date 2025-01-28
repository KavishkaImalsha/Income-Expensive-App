<?php

namespace Tests\Feature\updateDatabaseData\expenses;


use App\Models\Expense;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UpdateExpenseTest extends TestCase
{
    use RefreshDatabase;
    public function test_update_expense()
    {
        $this->withoutMiddleware();
        $existingExpense = Expense::factory()->create();
        $newExpense = Expense::factory()->make()->toArray();

        $response = $this->putJson("api/update-expense/$existingExpense->id", $newExpense);

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
