<?php

namespace App\Action\CategoryActions;

use App\Models\Category;
use Illuminate\Support\Facades\Log;

class DeleteCategory
{
    public function __invoke($category_id): array
    {
        $category = Category::find($category_id);
        Log::info($category->category_name);
        $category->delete();

        return [
            'message' => 'Category successfully deleted',
            'category_name' => $category->category_name,
            'category_type' => $category->category_type
        ];
    }
}
