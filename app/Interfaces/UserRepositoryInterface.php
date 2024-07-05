<?php 

namespace App\Interfaces;

interface UserRepositoryInterface {
    public function register(array $user);
    public function login(array $credentials);
    public function logout();
}