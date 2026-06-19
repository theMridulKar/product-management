<?php
namespace App\Repositories\Product;

interface ProductRepositoryInterface
{
    public function getAll(int $perPage = 10, ?string $search = null);

    public function findById(int $id);

    public function create(array $data);

    public function update(int $id, array $data);

    public function delete(int $id);
}