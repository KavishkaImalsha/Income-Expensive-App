<?php

namespace App\Action\CategoryActions;

use App\Models\Category;

class UpdateCategory
{
    public function __invoke($validateRequest, $category_id, $user_id): array
    {
        $category = Category::where('id', $category_id)
            ->where('uuid', $user_id)
            ->first();
        $category->category_name = $validateRequest['category_name'];
        $category->category_type = $validateRequest['category_type'];
        $category->save();

        return [
            "message" => "Category successfully updated"
        ];
    }
}
