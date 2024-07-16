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
}