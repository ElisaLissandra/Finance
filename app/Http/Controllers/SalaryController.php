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
        $salary  = $this->salaryRepository->index();
        return new CustomResponse($salary->toArray(), 200);
    }

    public function store(SalaryRequest $request) { 
        try{
            $salaryValidated = $request->validated();
            $this->salaryRepository->store($salaryValidated);

            return new CustomResponse(null, 201, 'Salário cadastrado com sucesso');

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
        return new CustomResponse(null, 200,'Salário editado com sucesso');
    }

    public function update(SalaryRequest $request, $slug) {
        $salaryUpdate = $request->validated();
        $this->salaryRepository->update($salaryUpdate, $slug);

        return new CustomResponse(null, 200, 'Salário atualizado com sucesso');
    }

    public function destroy($slug) {
        $this->salaryRepository->destroy($slug);
        return new CustomResponse(null, 200, 'Salário excluído com sucesso');
    }
}
