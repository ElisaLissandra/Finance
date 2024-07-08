<?php

namespace App\Http\Controllers;

use App\Http\Response\CustomResponse;
use App\Exceptions\CustomException;
use App\Http\Requests\CostRequest;
use App\Repositories\CostRepository;

class CostController extends Controller
{

    protected $costRepository;

    public function __construct(CostRepository $costRepository) {
        $this->costRepository = $costRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cost = $this->costRepository->index([]);
        return new CustomResponse(['cost' => $cost], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CostRequest $request)
    {   
        try{
            $costValidated = $request->validated();
            $this->costRepository->store($costValidated);

            return new CustomResponse('Custo cadastrado com sucesso', 201);
        }catch(\Exception $e) { 
            throw new CustomException($e->getMessage(), 404);
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        return $this->costRepository->show($slug);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $slug)
    {
        return  $this->costRepository->edit($slug);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CostRequest $request, string $slug)
    {
        $costUpdate = $request->validated();
        $this->costRepository->update($costUpdate, $slug);

        return new CustomResponse('Custo atualizado com sucesso', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $slug)
    {
        $this->costRepository->destroy($slug);
        return new CustomResponse('Custo excluído com sucesso', 200);
    }
}
