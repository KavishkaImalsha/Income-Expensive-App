<?php

namespace Tests\Feature\deleteDatabaseData\expenses;


use App\Models\Expense;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeleteExpenseTest extends TestCase
{
    use RefreshDatabase;

    public function test_delete_expense()
    {
        $expense = Expense::factory()->create();

        $response = $this->deleteJson("api/delete-expense/$expense->id");

        $response->assertOk();
        $response->assertSimilarJson([
            "message" => "Expense is successfully deleted"
        ]);
        $this->assertDatabaseMissing('expenses', [
            "expense_amount" => $expense["expense_amount"],
            "expense_category" => $expense["expense_category"]
        ]);
    }
}
