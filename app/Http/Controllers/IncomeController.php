<?php

namespace App\Http\Controllers;

use App\Action\IncomeActions\AddIncome;
use App\Action\IncomeActions\DeleteIncome;
use App\Action\IncomeActions\EditIncome;
use App\Action\IncomeActions\GetCurrentMonthIncomes;
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
    public function addIncome(IncomeFormRequest $request, AddIncome $addIncome, $user_id): JsonResponse
    {
        $validatedIncomeRequest = $request->validated();

        return response()->json($addIncome($validatedIncomeRequest, $user_id));
    }

    public function getIncomes($user_id ,GetIncomes $getIncomes): JsonResponse
    {
        return response()->json($getIncomes($user_id));
    }

    public function editIncome(EditIncome $editIncome, $income_id, $user_id): JsonResponse
    {
        return response()->json($editIncome($income_id, $user_id));
    }

    public function updateIncome(IncomeFormRequest $request, UpdateIncome $updateIncome, $income_id, $user_id): JsonResponse
    {
        $validatedRequest = $request->validated();
        return response()->json($updateIncome($validatedRequest, $income_id, $user_id));

    }

    public function deleteIncome(DeleteIncome $deleteIncome, $income_id, $user_id): JsonResponse
    {
        return response()->json($deleteIncome($income_id, $user_id));
    }

    public function getMonthIncome(GetCurrentMonthTotalIncome $getCurrentMonthTotalIncome, $user_id): JsonResponse
    {
        return response()->json($getCurrentMonthTotalIncome($user_id));
    }

    public function getCurrentMonthIncomes(GetCurrentMonthIncomes $getCurrentMonthIncomes ,$user_id): JsonResponse
    {

        return response()->json($getCurrentMonthIncomes($user_id));
    }
}
