<?php

namespace App\Http\Controllers;

use App\Http\Requests\RecentActivityRequest;
use App\Models\RecentActivity;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RecentActivityController extends Controller
{
    public function addRecentActivity(RecentActivityRequest $request, \App\Action\RecentActivities\RecentActivity $recentActivity): JsonResponse
    {
        $validateRequest = $request->validated();
        return response()->json($recentActivity($validateRequest));
    }
}
