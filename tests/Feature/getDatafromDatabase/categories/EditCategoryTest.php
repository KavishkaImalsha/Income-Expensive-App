<?php

namespace Tests\Feature\getDatafromDatabase\categories;

use App\Models\Category;
use Tests\TestCase;

class EditCategoryTest extends TestCase
{
    public function test_edit_category_from_database()
    {
        $categories = Category::factory()->count(5)->create();
        $id = mt_rand(1 , 5);

        $response = $this->getJson("api/edit-category/$id");

        $response->assertStatus(200);
        $response->assertJsonStructure(["data"]);
        $response->assertJson([
            "data" => [
                "id" => $id
            ]
        ]);
    }

}
