<?php

namespace App\Repositories;
use App\Interfaces\SalaryRepositoryInterface;
use App\Models\Salary;
use Illuminate\Support\Facades\Auth;

class SalaryRepository implements SalaryRepositoryInterface {
    public function index() {
        return Salary::all();
    }

    public function store(array $salary) {
        // Recuperar as informações do usuário logado
        $userId = Auth::id();

        // Criar a instância do modelo Salary sem salvar ainda no banco de dados
        $salaryCreate = new Salary();
        $salaryCreate->id_user = $userId;
        $salaryCreate->salary = $salary['salary'];
        $salaryCreate->description = $salary['description'];

        // Chamar a função generateSlug para gerar o slug
        $salaryCreate->slug = $salaryCreate->generateSlug();

        // Salvar no banco de dados
        $salaryCreate->save();

        return $salaryCreate;

        
    }


    public function show($slug) {
        return Salary::where('slug', $slug)->first();
    }

    public function edit($slug) { 
        return Salary::where('slug', $slug)->firstOrFail();
    }


    public function update(array $salary, $slug) {
        $salaryUpdate = Salary::where('slug', $slug)->firstOrFail();

        $salaryUpdate->salary = $salary['salary'];
        $salaryUpdate->description = $salary['description'];
        $salaryUpdate->slug = $salaryUpdate->generateSlug();
        $salaryUpdate->save();

        return $salaryUpdate;
    }

    public function destroy($slug) {
        $salaryDestroy = Salary::where('slug', $slug)->first();
        $salaryDestroy->delete();

        return $salaryDestroy;
    }
}