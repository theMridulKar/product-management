<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Repositories\Category\CategoryRepositoryInterface;

class CategoryController extends Controller
{
    public function __construct(private CategoryRepositoryInterface $categoryRepository) {

    }

    public function index(Request $request)
    {
        $categories = $this->categoryRepository->getAll($request->integer('per_page', 10));

        return response()->json([
            'success' => true,
            'message' => 'Categories retrieved successfully',
            'data' => $categories
        ]);
    }

    public function store(StoreCategoryRequest $request)
    {
        $category = $this->categoryRepository->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully',
            'data' => $category
        ], 201);
    }

    public function show(int $id)
    {
        return response()->json([
            'success' => true,
            'data' => $this->categoryRepository->findById($id)
        ]);
    }

    public function update(UpdateCategoryRequest $request, int $id) {
        $category = $this->categoryRepository->update($id, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully',
            'data' => $category
        ]);
    }

    public function destroy(int $id)
    {
        $this->categoryRepository->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully'
        ]);
    }
}