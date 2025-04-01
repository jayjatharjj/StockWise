import { type Product } from '@/stores/ProductSharedState';

const productsApiUrl = 'http://localhost:5073/api/products';

export const productService = {

    async saveProducts(products: Product[], replaceData: boolean): Promise<void> {
        const response = await fetch(`${productsApiUrl}?replace=${replaceData}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(products),
        });

        if (!response.ok) {
            throw new Error('Failed to save products');
        }
    },

    async loadProducts(): Promise<Product[]> {
        const response = await fetch(productsApiUrl);

        if (!response.ok) {
            throw new Error('Failed to load products');
        }

        return response.json();
    },

    async updateProduct(id: string, updateData: Partial<Product>): Promise<void> {
        const response = await fetch(`${productsApiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            throw new Error('Failed to update product');
        }
    }
};