<?php

namespace Tests\Feature\getDatafromDatabase;


use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GetCategoriesTest extends TestCase
{
    use RefreshDatabase;
    public function test_retrieve_categories_from_database()
    {
        $category = Category::factory()->create();

        $response = $this->getJson('api/get-categories');

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
