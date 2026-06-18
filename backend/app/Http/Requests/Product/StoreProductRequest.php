<?php

namespace App\Http\Requests\Product;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'category_id' => ['required', 'exists:categories,id']
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.exists' => 'The selected category does not exist.',
        ];
    }
}
