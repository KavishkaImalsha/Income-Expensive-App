<?php

namespace Tests\Feature\getDatafromDatabase\categories;


use App\Models\Category;
use App\Models\RegisteredUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GetCategoriesTest extends TestCase
{
    use RefreshDatabase;
    public function test_retrieve_categories_from_database()
    {
        $this->withoutMiddleware();
        $user = RegisteredUser::factory()->make();
        $category = Category::factory()->create(['uuid' => $user->uuid]);

        $response = $this->getJson("api/get-categories/$user->uuid");

        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                ["id" => $category->id,
                "category_name" => $category->category_name,
                "category_type" => $category->category_type]
            ]
        ]);
    }
}
