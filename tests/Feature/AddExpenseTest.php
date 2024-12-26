<?php


use App\Models\Expense;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AddExpenseTest extends TestCase
{
    use RefreshDatabase;
    public function test_expense_amount_and_category_database_save()
    {
        $expense = Expense::factory()->make()->toArray();

        $response = $this->postJson('api/add-expense', $expense);

        $response->assertStatus(200);
        $response->assertSimilarJson([
            'message' => 'Expense insert successfully'
        ]);
        $this->assertDatabaseHas('expenses', [
            'expense_amount' => $expense['expense_amount'],
            'expense_category' => $expense['expense_category']
        ]);

    }

}
