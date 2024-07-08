<?php

namespace App\Repositories;
use App\Models\Cost;
use App\Interfaces\CostRepositoryInterface;
use Illuminate\Support\Facades\Auth;


class CostRepository implements CostRepositoryInterface {
    public function index() {
        return Cost::all();
    }

    public function store(array $cost) {
        $userId = Auth::id();

        $costCreate = new Cost();
        $costCreate->id_user = $userId;
        $costCreate->cost = $cost['cost'];
        $costCreate->description = $cost['description'];
        $costCreate->slug = $costCreate->generateSlug();
        $costCreate->save();

        return $costCreate;
    }

    public function show($slug) {
        return Cost::where('slug', $slug)->first();
    }

    public function edit($slug) { 
        return Cost::where('slug', $slug)->firstOrFail();
    }

    public function update(array $cost, $slug) {
        $costUpdate = Cost::where('slug', $slug)->firstOrFail();

        $costUpdate->cost = $cost['cost'];
        $costUpdate->description = $cost['description'];
        $costUpdate->slug = $costUpdate->generateSlug();
        $costUpdate->save();

        return $costUpdate;
    }

    public function destroy($slug) {
        $costDestroy = Cost::where('slug', $slug)->first();
        $costDestroy->delete();

        return $costDestroy;
    }
}