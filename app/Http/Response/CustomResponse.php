<?php

namespace App\Http\Response;
use Illuminate\Contracts\Support\Responsable;

class CustomResponse implements Responsable {
    protected $message;
    protected $status;

    public function __construct($message, $status) {
        $this->message = $message;
        $this->status = $status;
    }

    public function toResponse($request) {
        return response()->json([
            'message' => $this->message,
            'status' => $this->status
        ], $this->status);
    }
}