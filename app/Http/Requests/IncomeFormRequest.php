<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IncomeFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'income_amount' => ['required', 'numeric', 'min:1'],
            'income_category' => ['required', 'string']
        ];
    }

    public function messages(): array
    {
        return [
            'income_amount.required' => 'Please enter the income amount',
            'income_amount.numeric' => 'Enter the numeric value for income amount',
            'income_amount.min' => 'Income amount should be grater than 0',
            'income_category.required' => 'please enter the income category'
        ];
    }
}
