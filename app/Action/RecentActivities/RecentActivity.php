<?php

namespace App\Action\RecentActivities;

class RecentActivity
{
    public function __invoke($validateRequest): array
    {
        \App\Models\RecentActivity::create([
            'user_id' => $validateRequest['user_id'],
            'type' =>$validateRequest['type'],
            'activity' => $validateRequest['activity']
        ]);

        $excessActivities = \App\Models\RecentActivity::where('user_id', $validateRequest['user_id'])
            ->orderBy('created_at', 'desc')
            ->skip(5)
            ->take(PHP_INT_MAX)
            ->get();

        foreach ($excessActivities as $activity){
            $activity->delete();
        }

        return [
            'message' => 'Recent Activity Successfully Added'
        ];
    }

}
