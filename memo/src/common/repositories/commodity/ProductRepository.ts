import {ProductModel} from "./models/ProductModel.ts";

export class ProductRepository {
    url = `https://6749e5aa868020296633047a.mockapi.io/api/v1/product`;

    async GetAll(): Promise<ProductModel[]> {
        try {
            const response = await fetch(this.url);
            const data: ProductModel[] = await response.json();
            return data;
        }
        catch (error) {
            console.error("Error fetching product list:", error);
            throw error;
        }
    }

    async Get(id: string): Promise<ProductModel> {
        try {
            const response = await fetch(`${this.url}/${id}`);
            const data: ProductModel = await response.json();
            return data;
        }
        catch (error) {
            console.error("Error fetching product item:", error);
            throw error;
        }
    }
}

export const ProductRepositoryInstance = new ProductRepository();