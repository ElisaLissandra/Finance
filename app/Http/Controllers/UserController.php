<?php

namespace App\Http\Controllers;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Repositories\UserRepository;
use App\Http\Response\CustomResponse;
use App\Exceptions\CustomException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    public function register(RegisterRequest $request) {
        $register = $request->validated();
        $this->userRepository->register($register);
        return new CustomResponse('Usuário cadastrado com sucesso', 200);   
    }

    public function login(LoginRequest $request) {
        try {
            $login = $request->validated();
            $user = $this->userRepository->login($login);

            if(!$user) {
                throw new CustomException('E-mail ou senha inválidos', 401);
            }

            $token = JWTAuth::fromUser($user); 

            return new CustomResponse([
                'user' => $user, 
                'token' => $token
            ], 200);
        }catch(\Exception $e) {
            return new CustomException($e->getMessage(), $e->getCode());
        }
    }

    public function refreshToken() {
        return JWTAuth::refresh();
    }
    
    public function logout() {
        $this->userRepository->logout();
        return new CustomResponse('Sessão encerrada com sucesso', 200);
    }
}
