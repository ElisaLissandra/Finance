<?php

namespace App\Http\Response;
use Illuminate\Contracts\Support\Responsable;


class CustomResponse implements Responsable {
    protected $message;
    protected $status;
    protected $data;

    public function __construct(array | null  $data = null, $status, string | null $message = null ) 
    {
        $this->message = $message;
        $this->data = $data;
        $this->status = $status;
        
    }

    public function toResponse($request) {
        return response()->json([
            'message' => $this->message,
            'data' => $this->data,
            'status' => $this->status
        ], $this->status);
    }
}

// class CustomResponse implements Responsable {
//     protected $data;
//     protected $status;

//     public function __construct($data, $status) {
//         $this->data = $data;
//         $this->status = $status;
//     }

//     public function toResponse($request) {
//         return response()->json([
//             'data' => $this->data,
//             'status' => $this->status
//         ], $this->status);
//     }
// }




