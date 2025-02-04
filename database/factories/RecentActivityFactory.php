<?php

namespace Database\Factories;

use App\Models\RecentActivity;
use Illuminate\Database\Eloquent\Factories\Factory;

class RecentActivityFactory extends Factory
{
    protected $model = RecentActivity::class;
    public function definition(): array
    {
        return [
            'user_id' => $this->faker->uuid,
            'type' => $this->faker->randomElement(['income', 'expense']),
            'activity' => $this->faker->randomElement(['Add Income', 'Delete Expense', 'Add Category', 'Add Expense'])
        ];
    }
}
