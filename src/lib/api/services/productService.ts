import { apiClient } from "../client";

export interface CreateProductResponse {
    message: string;
    product_id: string;
}

export const productService = {
    async createProduct(data: FormData): Promise<CreateProductResponse> {
        const response = await apiClient.post<CreateProductResponse>('/product', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    },
}
