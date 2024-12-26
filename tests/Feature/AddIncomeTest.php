<?php


use App\Models\Income;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AddIncomeTest extends TestCase
{
    use RefreshDatabase;
    public function test_income_and_category_database_save()
    {
        //A-Arrange
        //Dummy data that we need to test
        $income = Income::factory()->make()->toArray();

        //A-Act / Action
        //Implement that we need to test part. (endpoint / classes / functions)
        $response = $this->post('api/add-income', $income);

        //A-Assertion
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'message'
        ]);
        $response->assertSimilarJson([
            'message' => "Income added successfully"
        ]);
        $this->assertDatabaseHas('incomes', [
            'income_amount' => $income['income_amount'],
            'income_category' => $income['income_category']
        ]);
    }

    public function test_error_add_income_without_filling_income_amount()
    {
        $incomeWithoutAmount = Income::factory()->make(['income_amount' => null])->toArray();

        $response = $this->postJson('api/add-income', $incomeWithoutAmount);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['income_amount' => 'Please enter the income amount']);
    }

    public function test_error_add_income_without_entering_income_category()
    {
        $incomeWithoutCategory = Income::factory()->make(['income_category' => null])->toArray();

        $response = $this->postJson('api/add-income', $incomeWithoutCategory);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['income_category' => 'please enter the income category']);
    }

    public function test_error_add_income_without_passing_data()
    {
        $income = Income::factory()->make(['income_amount' => null, 'income_category' => null])->toArray();

        $response = $this->postJson('api/add-income', $income);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'income_amount',
            'income_category'
        ]);
        $this->assertDatabaseMissing('incomes', $income);
    }
}
