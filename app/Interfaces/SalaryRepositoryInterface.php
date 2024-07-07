<?php

namespace App\Interfaces;

interface SalaryRepositoryInterface {
    public function index();
    public function store(array $salary);
    public function show($slug);
    public function edit($slug);
    public function update(array $salary, $slug);
    public function destroy($slug);
}