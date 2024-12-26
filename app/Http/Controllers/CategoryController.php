<?php

namespace App\Http\Controllers;

use App\Action\CategoryActions\AddCategory;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function addCategory(CategoryRequest $request, AddCategory $addCategory): \Illuminate\Http\JsonResponse
    {
        $validatedRequest = $request->validated();

        return response()->json($addCategory($validatedRequest));
    }
}
