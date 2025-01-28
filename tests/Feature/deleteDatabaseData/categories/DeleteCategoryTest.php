<?php

namespace Tests\Feature\deleteDatabaseData\categories;

use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class DeleteCategoryTest extends TestCase
{
    use RefreshDatabase;
    public function test_delete_category()
    {
        $this->withoutMiddleware();
        $category = Category::factory()->create();

        $response = $this->deleteJson("api/delete-category/$category->id");

        $response->assertStatus(200);
        $response->assertSimilarJson([
            "message" => 'Category successfully deleted',
            'category_name' => $category->category_name,
            'category_type' => $category->category_type
        ]);
        $this->assertDatabaseMissing('categories', [
            "category_name" => $category["category_name"],
            "category_type" => $category["category_type"]
        ]);

    }

}
