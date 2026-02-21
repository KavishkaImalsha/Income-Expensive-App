<?php

namespace Tests\Feature\getDatafromDatabase;


use App\Models\RecentActivity;
use App\Models\RegisteredUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GetRecentActivitiesTest extends TestCase
{
    use RefreshDatabase;
    public function test_get_recent_activities()
    {
        $this->withoutMiddleware();
        $user = RegisteredUser::factory()->make();
        $recentActivities = RecentActivity::factory()->count(5)->create(['user_id' => $user->uuid])->toArray();

        $response = $this->getJson("/api/get-recent-activities/$user->uuid");

        $response->assertOk();
        $response->assertJsonStructure([
            "recent_activities"
        ]);
        $response->assertJson([
            "recent_activities" => $recentActivities
        ]);
    }
}
