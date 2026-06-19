<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

// auth
use App\Repositories\Auth\AuthRepository;
use App\Repositories\Auth\AuthRepositoryInterface;
// category
use App\Repositories\Category\CategoryRepository;
use App\Repositories\Category\CategoryRepositoryInterface;
// Product
use App\Repositories\Product\ProductRepository;
use App\Repositories\Product\ProductRepositoryInterface;
// Product Observer
use App\Models\Product;
use App\Observers\ProductObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // auth
        $this->app->bind(AuthRepositoryInterface::class, AuthRepository::class);
        // category
        $this->app->bind(CategoryRepositoryInterface::class, CategoryRepository::class);
        // product
        $this->app->bind(ProductRepositoryInterface::class, ProductRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Product::observe(ProductObserver::class);
    }
}
