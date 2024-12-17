<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegisteredUser extends Model
{
    protected $table = 'registered_users';

    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'password'
    ];
}
