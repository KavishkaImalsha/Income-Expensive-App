<?php

namespace Tests\Feature;

use App\Models\RecentActivity;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AddRecentActivitiesTest extends TestCase
{
    use RefreshDatabase;
    public function test_add_user_recent_activities()
    {
        $this->withoutMiddleware();
        $recentActivities = RecentActivity::factory()->make()->toArray();

        $response = $this->postJson('/api/add-recent-activity', $recentActivities);

        $response->assertOk();
        $response->assertJsonStructure([
            'message'
        ]);
        $response->assertSimilarJson([
            'message' => 'Recent Activity Successfully Added'
        ]);
    }

}
