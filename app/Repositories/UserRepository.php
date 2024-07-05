<?php 

namespace App\Repositories;
use App\Interfaces\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserRepository implements UserRepositoryInterface {
    public function register(array $user) {
        return User::create([
            'name' => $user['name'],
            'email' => $user['email'],
            'password' => bcrypt($user['password'])
        ]);
    }

    public function login(array $credentials) {
        if(Auth::attempt($credentials)) {
            return Auth::user();
        }
    }
    
    public function logout() {
        Auth::logout();
    }

}