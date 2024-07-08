<?php

namespace App\Repositories;
use App\Interfaces\FinanceRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class FinanceRepository implements FinanceRepositoryInterface {
    public function index() {
        $userId = Auth::id();
        $data = User::where('id', $userId)->with('salaries', 'costs')->get();
        return $data;

    }
}