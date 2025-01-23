<?php

namespace Database\Factories;

use App\Models\RegisteredUser;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RegisteredUser>
 */
class RegisteredUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = RegisteredUser::class;
    public function definition(): array
    {
        return [
            'uuid' => $this->faker->uuid,
            'firstName' => $this->faker->firstName,
            'lastName' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'password' => $this->faker->unique()->password(8)
        ];
    }
}
