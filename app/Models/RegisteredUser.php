<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegisteredUser extends Model
{
    use HasFactory;
    protected $table = 'registered_user';
    protected $primaryKey = 'uuid';
   public $incrementing = false;

    protected $fillable = [
        'uuid',
        'firstName',
        'lastName',
        'email',
        'password'
    ];
}
