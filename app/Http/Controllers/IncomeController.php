<?php

namespace App\Http\Controllers;

use App\Action\IncomeActions\AddIncome;
use App\Action\IncomeActions\DeleteIncome;
use App\Action\IncomeActions\EditIncome;
use App\Action\IncomeActions\GetCurrentMonthTotalIncome;
use App\Action\IncomeActions\GetIncomes;
use App\Action\IncomeActions\UpdateIncome;
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

    public function editIncome(EditIncome $editIncome, $income_id): JsonResponse
    {
        return response()->json($editIncome($income_id));
    }

    public function updateIncome(IncomeFormRequest $request, UpdateIncome $updateIncome, $income_id): JsonResponse
    {
        $validatedRequest = $request->validated();
        return response()->json($updateIncome($validatedRequest, $income_id));

    }

    public function deleteIncome(DeleteIncome $deleteIncome, $income_id): JsonResponse
    {
        return response()->json($deleteIncome($income_id));
    }

    public function getMonthIncome(GetCurrentMonthTotalIncome $getCurrentMonthTotalIncome): JsonResponse
    {
        return response()->json($getCurrentMonthTotalIncome());
    }
}
