<?php

namespace Tests\Feature\getDatafromDatabase\Expenses;

use App\Models\Expense;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EditExpenseTest extends TestCase
{
    use RefreshDatabase;
    public function test_edit_expense()
    {
        $expense = Expense::factory()->create();

        $response = $this->getJson("api/edit-expense/$expense->id");

        $response->assertOk();
        $response->assertJson([
            "expense" => [
                "expense_amount" => $expense["expense_amount"],
                "expense_category" => $expense["expense_category"]
            ]
        ]);
    }
}
