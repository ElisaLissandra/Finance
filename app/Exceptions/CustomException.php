<?php

namespace App\Exceptions;

use Exception;

class CustomException extends Exception
{
    protected $message;
    protected $status;

    public function __construct($message, $status) {
        $this->message = $message;
        $this->status = $status;
    }

    public function render() {
        return response()->json([
            'message' => $this->message,
            'status' => $this->status
        ], $this->status);
    }
}
