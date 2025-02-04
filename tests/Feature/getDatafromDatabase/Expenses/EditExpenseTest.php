<?php

namespace Tests\Feature\getDatafromDatabase\Expenses;

use App\Models\Expense;
use App\Models\RegisteredUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EditExpenseTest extends TestCase
{
    use RefreshDatabase;
    public function test_edit_expense()
    {
        $this->withoutMiddleware();
        $user = RegisteredUser::factory()->make();
        $expense = Expense::factory()->create(['uuid' => $user->uuid]);

        $response = $this->getJson("api/edit-expense/$expense->id/$user->uuid");

        $response->assertOk();
        $response->assertJson([
            "expense" => [
                "expense_amount" => $expense["expense_amount"],
                "expense_category" => $expense["expense_category"]
            ]
        ]);
    }
}
