<?php

namespace App\Action\RecentActivities;

use App\Models\RecentActivity;

class GetRecentActivities
{
    public function __invoke($user_id): array
    {
        $recentActivities = RecentActivity::where('user_id', $user_id)->get();

        return [
            'recent_activities' => $recentActivities
        ];
    }
}
