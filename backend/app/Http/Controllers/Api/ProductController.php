<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Repositories\Product\ProductRepositoryInterface;

class ProductController extends Controller
{
    public function __construct(private ProductRepositoryInterface $productRepository) {

    }

    public function index(Request $request)
    {
        $products = $this->productRepository->getAll($request->integer('per_page', 10));

        return response()->json([
            'success' => true,
            'message' => 'Products retrieved successfully',
            'data' => $products
        ]);
    }

    public function store(StoreProductRequest $request)
    {
        $product = $this->productRepository->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully',
            'data' => $product
        ], 201);
    }

    public function show(int $id)
    {
        return response()->json([
            'success' => true,
            'data' => $this->productRepository->findById($id)
        ]);
    }

    public function update(UpdateProductRequest $request, int $id)
    {
        $product = $this->productRepository->update($id, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully',
            'data' => $product
        ]);
    }

    public function destroy(int $id)
    {
        $this->productRepository->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully'
        ]);
    }
}