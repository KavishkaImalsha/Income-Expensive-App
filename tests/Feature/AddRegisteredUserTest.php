<?php


use App\Models\RegisteredUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AddRegisteredUserTest extends TestCase
{
    use RefreshDatabase;

    public function test_storing_registered_user()
    {
        $user = RegisteredUser::factory()->make()->toArray();

        $response = $this->postJson('api/add-registered-user', $user);

        $response->assertOk();
        $response->assertSimilarJson([
           "message" => "User Successfully Created"
        ]);
    }

}
