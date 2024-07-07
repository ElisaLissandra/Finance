<?php

namespace App\Http\Controllers;

use App\Exceptions\CustomException;
use App\Repositories\SalaryRepository;
use App\Http\Requests\SalaryRequest;
use App\Http\Response\CustomResponse;


class SalaryController extends Controller
{
    protected $salaryRepository;

    public function __construct(SalaryRepository $salaryRepository) {
        $this->salaryRepository = $salaryRepository;
    }
    public function index() {
        $salary  = $this->salaryRepository->index([]);
        return new CustomResponse(['salary' => $salary], 200);
    }

    public function store(SalaryRequest $request) { 
        try{
            $salaryValidated = $request->validated();
            $this->salaryRepository->store($salaryValidated);

            return new CustomResponse('Salário cadastrado com sucesso', 201);

        } catch (\Exception $e) {
            //throw new CustomException('Falha no cadastro do salário', 404);
            throw new CustomException($e->getMessage(), 404);
        }
    }

    public function show($slug) {
        return $this->salaryRepository->show($slug);
    }

    public function edit($slug) {
        $this->salaryRepository->edit($slug);
        return new CustomResponse('Salário editado com sucesso', 200);
    }

    public function update(SalaryRequest $request, $slug) {
        $salaryUpdate = $request->validated();
        $this->salaryRepository->update($salaryUpdate, $slug);

        return new CustomResponse('Salário atualizado com sucesso', 200);
    }

    public function destroy($slug) {
        $this->salaryRepository->destroy($slug);
        return new CustomResponse('Salário excluído com sucesso', 200);
    }
}
