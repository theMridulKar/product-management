<?php

namespace App\Repositories\Category;
use App\Models\Category;

class CategoryRepository implements CategoryRepositoryInterface
{
    public function getAll(int $perPage = 10)
    {
        return Category::query()->latest()->paginate($perPage);
    }

    public function findById(int $id)
    {
        return Category::findOrFail($id);
    }

    public function create(array $data)
    {
        return Category::create($data);
    }

    public function update(int $id, array $data)
    {
        $category = Category::findOrFail($id);
        $category->update($data);
        return $category->fresh();
    }

    public function delete(int $id)
    {
        $category = Category::findOrFail($id);
        return $category->delete();
    }
}