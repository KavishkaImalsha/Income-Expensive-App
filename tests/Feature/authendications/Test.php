<?php

namespace Tests\Feature\authendications;

use App\Models\RegisteredUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use LoginAuthentication;
use Tests\TestCase;

class Test extends TestCase
{
    use RefreshDatabase;
    public function test_user_authentication_in_user_login()
    {
        $registeredUser = RegisteredUser::factory()->create(["password" => Hash::make("password")])->toArray();

        $response = $this->postJson('api/login', ["email" => $registeredUser["email"], "password" => "password"]);

        $response->assertOk();
        $response->assertJsonStructure([
           "message",
           "token",
            "user"
        ]);
    }
}
