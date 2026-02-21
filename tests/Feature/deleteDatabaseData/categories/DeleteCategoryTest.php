<?php

namespace Tests\Feature\deleteDatabaseData\categories;

use App\Models\Category;
use App\Models\RegisteredUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class DeleteCategoryTest extends TestCase
{
    use RefreshDatabase;
    public function test_delete_category()
    {
        $this->withoutMiddleware();
        $user = RegisteredUser::factory()->make();
        $category = Category::factory()->create(['uuid' => $user->uuid]);

        $response = $this->deleteJson("api/delete-category/$category->id/$user->uuid");

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
