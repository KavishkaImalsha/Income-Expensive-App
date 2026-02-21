<?php

namespace Tests\Feature\deleteDatabaseData\expenses;


use App\Models\Expense;
use App\Models\RegisteredUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeleteExpenseTest extends TestCase
{
    use RefreshDatabase;

    public function test_delete_expense()
    {
        $this->withoutMiddleware();
        $user = RegisteredUser::factory()->make();
        $expense = Expense::factory()->create(['uuid' => $user->uuid]);

        $response = $this->deleteJson("api/delete-expense/$expense->id/$user->uuid");

        $response->assertOk();
        $response->assertSimilarJson([
            "message" => "Expense is successfully deleted",
            "expense_category" => $expense->expense_category,
            "expense_amount" => $expense->expense_amount
        ]);
        $this->assertDatabaseMissing('expenses', [
            "expense_amount" => $expense["expense_amount"],
            "expense_category" => $expense["expense_category"]
        ]);
    }
}
