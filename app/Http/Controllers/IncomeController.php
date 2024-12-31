<?php

namespace App\Http\Controllers;

use App\Action\IncomeActions\AddIncome;
use App\Action\IncomeActions\GetIncomes;
use App\Http\Requests\IncomeFormRequest;
use App\Models\Income;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class IncomeController extends Controller
{
    public function addIncome(IncomeFormRequest $request, AddIncome $addIncome): JsonResponse
    {
        $validatedIncomeRequest = $request->validated();

        return response()->json($addIncome($validatedIncomeRequest));
    }

    public function getIncomes(GetIncomes $getIncomes)
    {
        return response()->json($getIncomes());
    }
}
