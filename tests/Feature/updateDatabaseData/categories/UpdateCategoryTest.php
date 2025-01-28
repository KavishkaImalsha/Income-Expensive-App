<?php

namespace Tests\Feature\updateDatabaseData\categories;

use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;


class UpdateCategoryTest extends TestCase
{
    use RefreshDatabase;
    public function test_update_category()
    {
        $this->withoutMiddleware();
        $exitingCategory = Category::factory()->create();
        $newCategory = Category::factory()->make()->toArray();

        $response = $this->putJson("api/update-category/$exitingCategory->id", $newCategory);

        $response->assertOk();
        $response->assertStatus(200);
        $response->assertSimilarJson([
            "message" => "Category successfully updated"
        ]);
        $this->assertDatabaseHas("categories",[
            "category_name" => $newCategory['category_name'],
            "category_type" => $newCategory['category_type']
        ]);
    }
}
