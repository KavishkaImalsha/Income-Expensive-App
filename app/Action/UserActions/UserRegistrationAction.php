<?php

namespace App\Action\UserActions;

use App\Models\RegisteredUser;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserRegistrationAction
{
    public function __invoke($validateRequest): array
    {
        $hashedPassword = Hash::make($validateRequest["password"]);

        RegisteredUser::create([
            'uuid' => (string) Str::uuid(),
            "firstName" => $validateRequest["firstName"],
            'lastName' => $validateRequest["lastName"],
            'email' => $validateRequest["email"],
            'password' => $hashedPassword
        ]);

        return [
            "message" => "User Successfully Created"
        ];
    }
}
