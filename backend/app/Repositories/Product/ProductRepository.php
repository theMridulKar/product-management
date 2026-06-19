<?php

namespace App\Repositories\Product;
use App\Models\Product;

class ProductRepository implements ProductRepositoryInterface
{
    public function getAll(int $perPage = 10, ?string $search = null)
    {
        return Product::with('category')->when($search, fn ($query) =>
                    $query->where('name', 'like', "%{$search}%"
                ))->latest()->paginate($perPage);
    }

    public function findById(int $id)
    {
        return Product::with('category')->findOrFail($id);
    }

    public function create(array $data)
    {
        return Product::create($data)->load('category');
    }

    public function update(int $id, array $data)
    {
        $product = Product::findOrFail($id);
        $product->update($data);
        return $product->fresh()->load('category');
    }

    public function delete(int $id)
    {
        $product = Product::findOrFail($id);
        return $product->delete();
    }
}