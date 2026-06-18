<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Repositories\Auth\AuthRepositoryInterface;

class AuthController extends Controller
{
    public function __construct(private AuthRepositoryInterface $authRepository) {

    }

    public function register(RegisterRequest $request)
    {
        $user = $this->authRepository->register($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Registration successful',
            'data' => $user
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $token = $this->authRepository->login($request->validated());

        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'token' => $token,
                'type' => 'Bearer'
            ]
        ]);
    }

    public function profile()
    {
        return response()->json([
            'success' => true,
            'data' => $this->authRepository->profile()
        ]);
    }

    public function logout()
    {
        $this->authRepository->logout();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ]);
    }
}