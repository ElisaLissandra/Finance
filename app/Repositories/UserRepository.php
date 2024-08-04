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

        return null;
    }
    
    public function logout() {
        Auth::logout();
    }

    public function getUser() {
        $user = Auth::user();
        if ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
            ];
        }
        return null;
    }
}