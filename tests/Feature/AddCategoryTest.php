<?php


use App\Models\Category;
use App\Models\RegisteredUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AddCategoryTest extends TestCase
{
    use RefreshDatabase;
    public function test_add_category_database_save()
    {
        $this->withoutMiddleware();
        $user = RegisteredUser::factory()->make();
        $category = Category::factory()->make()->toArray();

        $response = $this->postJson("api/add-category/$user->uuid", $category);

        $response->assertStatus(200);
        $response->assertSimilarJson([
            'message' => 'Category is successfully added.'
        ]);
        $this->assertDatabaseHas('categories', [
            'category_name' => $category['category_name'],
            'category_type' => $category['category_type']
        ]);
    }

    public function test_add_category_without_passing_category_name()
    {
        $this->withoutMiddleware();
        $user = RegisteredUser::factory()->make();
        $category = Category::factory()->make(['category_name' => null])->toArray();

        $response = $this->postJson("api/add-category/$user->uuid", $category);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'category_name'
        ]);
        $this->assertDatabaseMissing('categories', $category);
    }

    public function test_add_category_without_passing_category_type()
    {
        $this->withoutMiddleware();
        $user = RegisteredUser::factory()->make();
        $category = Category::factory()->make(['category_type' => null])->toArray();

        $response = $this->postJson("api/add-category/$user->uuid", $category);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'category_type'
        ]);
        $this->assertDatabaseMissing('categories', $category);
    }

    public function test_add_category_without_passing_any_data()
    {
        $this->withoutMiddleware();
        $user = RegisteredUser::factory()->make();
        $category = Category::factory()->make([
            'category_name' => null,
            'category_type' => null
            ])->toArray();

        $response = $this->postJson("api/add-category/$user->uuid", $category);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'category_name',
            'category_type'
        ]);
        $this->assertDatabaseMissing('categories', $category);
    }
}
