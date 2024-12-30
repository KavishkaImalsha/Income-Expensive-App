<?php

namespace App\Action\CategoryActions;

use App\Models\Category;

class DeleteCategory
{
    public function __invoke($category_id): array
    {
        $category = Category::find($category_id);
        $category->delete();

        return [
            'message' => 'Category successfully deleted'
        ];
    }
}
