<?php

namespace App\Repositories\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Repositories\Auth\AuthRepositoryInterface;

class AuthRepository implements AuthRepositoryInterface
{
    public function register(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password'])
        ]);
    }

    public function login(array $credentials)
    {
        if (!$token = Auth::attempt($credentials)) {
            return null;
        }

        return $token;
    }

    public function profile()
    {
        return Auth::user();
    }

    public function logout()
    {
        Auth::logout();

        return true;
    }
}