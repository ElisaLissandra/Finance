<?php

namespace App\Interfaces;

interface CostRepositoryInterface  {
    public function index();
    public function store(array $cost);
    public function show($slug);
    public function edit($slug);
    public function update(array $cost, $slug);
    public function destroy($slug);
}