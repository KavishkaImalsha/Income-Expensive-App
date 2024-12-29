<?php

namespace App\Http\Controllers;

use App\Action\CategoryActions\AddCategory;
use App\Action\CategoryActions\UpdateCategory;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Container\Attributes\Log;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    use RefreshDatabase;
    public function addCategory(CategoryRequest $request, AddCategory $addCategory): JsonResponse
    {
        $validatedRequest = $request->validated();

        return response()->json($addCategory($validatedRequest));
    }

    public function getCategories(): JsonResponse
    {
        $allCategories = Category::all();
        return response()->json(['data' => $allCategories]);
    }

    public function editCategory($category_id): JsonResponse
    {
        $category = Category::find($category_id);
        \Illuminate\Support\Facades\Log::info($category);
        return response()->json([
            "data" => $category
        ]);
    }

    public function updateCategory(CategoryRequest $request,UpdateCategory $updateCategory,$category_id): JsonResponse
    {
        $validateRequest = $request->validated();

        return response()->json($updateCategory($validateRequest, $category_id));
    }
}
