<?php

namespace App\Http\Controllers;

use App\Models\RegisteredUser;
use http\Env\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use PhpParser\Node\Expr\Cast\Object_;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $validatedRequest = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        $user = RegisteredUser::where('email', $validatedRequest["email"])->first();

        if(!$user || !Hash::check($validatedRequest['password'],$user->password)){
            return response()->json([
                "message" => "Invalid Credentials"
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            "message" => "Login successfully",
            "token" => $token,
            "user" => $user
        ]);
    }
}
