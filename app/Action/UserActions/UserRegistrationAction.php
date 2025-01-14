<?php

namespace App\Action\UserActions;

use App\Models\RegisteredUser;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserRegistrationAction
{
    public function __invoke($validateRequest)
    {
        $encryptEmail = Hash::make($validateRequest["email"]);
        $hashedPassword = Hash::make($validateRequest["password"]);

        RegisteredUser::create([
            'uuid' => (string) Str::uuid(),
            "firstName" => $validateRequest["firstName"],
            'lastName' => $validateRequest["lastName"],
            'email' => $encryptEmail,
            'password' => $hashedPassword
        ]);

        return [
            "message" => "User Successfully Created"
        ];
    }
}
