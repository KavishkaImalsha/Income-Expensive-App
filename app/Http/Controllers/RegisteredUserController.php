<?php

namespace App\Http\Controllers;

use App\Action\UserActions\UserRegistrationAction;
use App\Http\Requests\UserRegisterRequest;
use App\Models\RegisteredUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;

class RegisteredUserController extends Controller
{
    use HasFactory,HasApiTokens;
    public function addRegisteredUser(UserRegisterRequest $request, UserRegistrationAction $userRegistrationAction): JsonResponse
    {
        $validateRequest = $request->validated();
        return response()->json($userRegistrationAction($validateRequest));
    }
}
