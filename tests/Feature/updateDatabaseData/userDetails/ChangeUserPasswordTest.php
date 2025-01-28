<?php

namespace Tests\Feature\updateDatabaseData\userDetails;


use App\Models\RegisteredUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ChangeUserPasswordTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_password_change()
    {
        $this->withoutMiddleware();

        $regUser = RegisteredUser::factory()->create(['password' => Hash::make('password')]);
        $changePassword = ['currentPassword' => 'password', 'newPassword' => 'newPassword', 'uuid' => $regUser->uuid];

        $response = $this->postJson('api/change-password', $changePassword);

        $response->assertOk();
        $response->assertJsonStructure([
            "message",
            "status"
        ]);
    }
}
