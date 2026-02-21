<?php

namespace Database\Factories;

use App\Models\Expense;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Expense::class;
    public function definition(): array
    {
        return [
            'expense_amount' => $this->faker->randomFloat(2,1),
            'expense_category' => $this->faker->randomElement(['Home', 'Food', 'Transport'])
        ];
    }
}
