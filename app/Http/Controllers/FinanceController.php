<?php

namespace App\Http\Controllers;

use App\Http\Response\CustomResponse;
use Illuminate\Http\Request;
use App\Repositories\FinanceRepository;

class FinanceController extends Controller
{

    protected $financeRepository;

    public function __construct(FinanceRepository $financeRepository) {
        $this->financeRepository = $financeRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $finance = $this->financeRepository->index();
        return new CustomResponse($finance->toArray(), 200);
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
