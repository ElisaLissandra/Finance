<?php

namespace App\Http\Controllers;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Repositories\UserRepository;
use App\Http\Response\CustomResponse;
use App\Exceptions\CustomException;
use Carbon\Carbon;
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
        return new CustomResponse(null, 200,'Usuário cadastrado com sucesso');   
    }

    public function login(LoginRequest $request) {
        try {
            $login = $request->validated();
            $user = $this->userRepository->login($login);
    
            if (!$user) {
                throw new CustomException('E-mail ou senha inválidos', 401);
            }
    
            $token = JWTAuth::fromUser($user); 
    
            return new CustomResponse([
                'user' => $user, 
                'token' => $token,
            ], 200);
        } catch (CustomException $e) {
            // Se for uma CustomException, use o método render dela
            return $e->render($request);
        } catch (\Exception $e) {
            // Para outras exceções, retorne um erro genérico
            return response()->json([
                'error' => 'Erro interno do servidor'
            ], 500);
        }


        
    }

    public function refreshToken() {
        return JWTAuth::refresh();
    }
    
    public function logout() {
        $this->userRepository->logout();
        return new CustomResponse(null, 200, 'Sessão encerrada com sucesso');
    }

    public function getUser() {
        $user = $this->userRepository->getUser();
        return new CustomResponse($user, 200);
    }
}
