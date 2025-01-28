<?php

namespace App\Http\Controllers;

use App\Action\UserActions\UserChangePasswordAction;
use App\Action\UserActions\UserRegistrationAction;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\UserRegisterRequest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Http\JsonResponse;
use Laravel\Sanctum\HasApiTokens;

class RegisteredUserController extends Controller
{
    use HasFactory,HasApiTokens;
    public function addRegisteredUser(UserRegisterRequest $request, UserRegistrationAction $userRegistrationAction): JsonResponse
    {
        $validateRequest = $request->validated();
        return response()->json($userRegistrationAction($validateRequest));
    }

    public function changePassword(ChangePasswordRequest $request, UserChangePasswordAction $userChangePasswordAction): JsonResponse
    {
        $validateRequest = $request->validated();
        return response()->json($userChangePasswordAction($validateRequest));
    }
}
