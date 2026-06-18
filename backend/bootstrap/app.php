<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Log;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        
    })
    ->withExceptions(function (Exceptions $exceptions): void {

        // handle invalid or non-existing routes
        $exceptions->render(function (NotFoundHttpException $e, $request) {

            return response()->json([
                'success' => false,
                'message' => 'Resource not found.',
            ], 404);

        });

        // handle missing database records
        $exceptions->render(function (ModelNotFoundException $e, $request) {

            return response()->json([
                'success' => false,
                'message' => 'Record not found.',
            ], 404);

        });

        // handle all unhandled server exceptions
        $exceptions->render(function (\Throwable $e, $request) {

            Log::error($e);

            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Internal server error.',
                ], 500);
            }

        });

    })->create();
