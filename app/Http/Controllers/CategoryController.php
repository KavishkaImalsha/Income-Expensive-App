<?php

namespace App\Http\Controllers;

use App\Action\CategoryActions\AddCategory;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Container\Attributes\Log;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
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
}
