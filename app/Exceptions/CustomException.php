<?php

namespace App\Exceptions;

use Exception;

class CustomException extends Exception
{
    protected $status;

    public function __construct($message, $status, Exception $previous = null) {
        parent::__construct($message, 0, $previous);
        $this->status = $status;
    }

    public function render($request)
    {
        return response()->json([
            'message' => $this->getMessage(),
            'status' => $this->status
        ], $this->status);
    }
}
