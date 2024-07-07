<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Support\Str;

class Salary extends Model
{
    use HasFactory;

    protected $table ='salaries';

    protected $fillable = [
        'id_user',
        'salary', 
        'description',
        'slug'
    ];


    public function user() {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function generateSlug() {
        return Str::slug($this->user->name . ' ' . $this->description . ' ' . $this->salary);
    }

    
}
