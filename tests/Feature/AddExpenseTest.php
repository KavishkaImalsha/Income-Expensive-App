<?php


use App\Models\Expense;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AddExpenseTest extends TestCase
{
    use RefreshDatabase;
    public function test_expense_amount_and_category_database_save()
    {
        $this->withoutMiddleware();
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

    public function test_add_expense_without_passing_expense_amount()
    {
        $this->withoutMiddleware();
        $expenseWithoutAmount = Expense::factory()->make(['expense_amount' => null])->toArray();

        $response = $this->postJson('api/add-expense', $expenseWithoutAmount);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'expense_amount'
        ]);
        $this->assertDatabaseMissing('expenses', $expenseWithoutAmount);
    }

    public function test_add_expense_without_passing_expense_category()
    {
        $this->withoutMiddleware();
        $expenseWithoutCategory = Expense::factory()->make(['expense_category' => null])->toArray();

        $response = $this->postJson('api/add-expense', $expenseWithoutCategory);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'expense_category'
        ]);
        $this->assertDatabaseMissing('expenses', $expenseWithoutCategory);
    }

    public function test_add_expense_without_passing_any_data()
    {
        $this->withoutMiddleware();
        $expense = Expense::factory()->make(['expense_amount' => null, 'expense_category' => null])->toArray();

        $response = $this->postJson('api/add-expense', $expense);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'expense_amount',
            'expense_category'
        ]);
        $this->assertDatabaseMissing('expenses', $expense);

    }
}
