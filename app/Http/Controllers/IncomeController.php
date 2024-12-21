<?php

namespace App\Http\Controllers;

use App\Action\IncomeActions\AddIncome;
use App\Http\Requests\IncomeFormRequest;
use App\Models\Income;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class IncomeController extends Controller
{
    public function addIncome(IncomeFormRequest $request, AddIncome $addIncome): JsonResponse
    {
        $validatedIncomeRequest = $request->validated();


        return response()->json($addIncome($validatedIncomeRequest));
    }
}
