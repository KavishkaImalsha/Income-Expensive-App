<?php

namespace App\Action\CategoryActions;

use App\Models\Category;

class UpdateCategory
{
    public function __invoke($validateRequest, $category_id): array
    {
        $category = Category::find($category_id);
        $category->category_name = $validateRequest['category_name'];
        $category->category_type = $validateRequest['category_type'];
        $category->save();

        return [
            "message" => "Category successfully updated"
        ];
    }
}
