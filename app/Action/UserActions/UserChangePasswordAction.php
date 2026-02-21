<?php

namespace App\Action\UserActions;

use App\Models\RegisteredUser;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserChangePasswordAction
{
    public function __invoke($validateRequest): array
    {
        $user = RegisteredUser::find($validateRequest['uuid']);

        if(!Hash::check($validateRequest['currentPassword'], $user->password)){
            return ["message" => "Incorrect Password", "status" => Response::HTTP_BAD_REQUEST];//400
        }

        $user->password = Hash::make($validateRequest['newPassword']);
        $user->save();

        return ["message" => "Password change successfully", "status" => 200];
    }
}
