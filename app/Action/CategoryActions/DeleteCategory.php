<?php

namespace App\Action\CategoryActions;

use App\Models\Category;
use Illuminate\Support\Facades\Log;

class DeleteCategory
{
    public function __invoke($category_id, $user_id): array
    {
        $category = Category::where('id', $category_id)
            ->where('uuid', $user_id)
            ->first();
        $category->delete();

        return [
            'message' => 'Category successfully deleted',
            'category_name' => $category->category_name,
            'category_type' => $category->category_type
        ];
    }
}
