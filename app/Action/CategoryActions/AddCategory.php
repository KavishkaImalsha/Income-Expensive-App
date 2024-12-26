<?php

namespace App\Action\CategoryActions;

use App\Models\Category;

class AddCategory
{
    public function __invoke($validatedRequest)
    {
        Category::create([
            'category_name' => $validatedRequest['category_name'],
            'category_type' => $validatedRequest['category_type']
        ]);

        return [
            'message' => 'Category is successfully added.'
        ];
    }

}
