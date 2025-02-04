<?php

namespace Tests\Feature\getDatafromDatabase\categories;

use App\Models\Category;
use App\Models\RegisteredUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EditCategoryTest extends TestCase
{
    use RefreshDatabase;
    public function test_edit_category_from_database()
    {
        $this->withoutMiddleware();
        $user = RegisteredUser::factory()->make();
        $categories = Category::factory()->count(5)->create(['uuid' => $user->uuid]);
        $id = mt_rand(1 , 5);

        $response = $this->getJson("api/edit-category/$id/$user->uuid");

        $response->assertStatus(200);
        $response->assertJsonStructure(["data"]);
        $response->assertJson([
            "data" => [
                "id" => $id
            ]
        ]);
    }

}
