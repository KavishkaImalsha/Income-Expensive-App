<?php

namespace App\Http\Controllers;

use App\Action\CategoryActions\AddCategory;
use App\Action\CategoryActions\DeleteCategory;
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
    public function addCategory(CategoryRequest $request, AddCategory $addCategory, $user_id): JsonResponse
    {
        $validatedRequest = $request->validated();

        return response()->json($addCategory($validatedRequest, $user_id));
    }

    public function getCategories($user_id): JsonResponse
    {
        $allCategories = Category::where('uuid', '=', $user_id)->get();
        return response()->json(['data' => $allCategories]);
    }

    public function editCategory($category_id, $user_id): JsonResponse
    {
        $category = Category::where('uuid', $user_id)
            ->where('id', $category_id)
            ->first();
        return response()->json([
            "data" => $category
        ]);
    }

    public function updateCategory(CategoryRequest $request,UpdateCategory $updateCategory,$category_id,$user_id): JsonResponse
    {
        $validateRequest = $request->validated();

        return response()->json($updateCategory($validateRequest, $category_id, $user_id));
    }

    public function deleteCategory($category_id, $user_id ,DeleteCategory $deleteCategory): JsonResponse
    {
        return response()->json($deleteCategory($category_id, $user_id));
    }
}
