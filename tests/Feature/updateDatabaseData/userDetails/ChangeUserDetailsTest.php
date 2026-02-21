<?php

namespace Tests\Feature\updateDatabaseData\userDetails;


use App\Models\RegisteredUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChangeUserDetailsTest extends TestCase
{
use RefreshDatabase;
    public function test_change_user_details()
    {
        $this->withoutMiddleware();
        $user = RegisteredUser::factory()->create();
        $changeUser = [
            "firstName" => 'Mac',
            "lastName" => 'Devin',
            "email" => 'mac.ac@gmail.com'
            ];

        $response = $this->putJson("api/change-user-details/$user->uuid", $changeUser);

        $response->assertOk();
        $response->assertJsonStructure([
            "message"
        ]);
        $response->assertSimilarJson([
            'message' => 'Details successfully changed'
        ]);
    }
}
