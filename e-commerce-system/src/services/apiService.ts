import { IProduct, ProductsApiResponse } from "../models/Product.js";
import { NetworkError, DataError } from "../utils/errorHandler.js";

const BASE_URL = "https://dummyjson.com";

export async function fetchAllProducts(): Promise<IProduct[]> {
    const response = await fetch(`${BASE_URL}/products?limit=0`);

    if(!response.ok) {
        throw new NetworkError(`Failed to fetch products: ${response.statusText}`, response.status);
    }

    const data = (await response.json()) as ProductsApiResponse;

    if (!data.products || !Array.isArray(data.products)) {
        throw new DataError("API response is missing products array", "products");
    }

    return data.products;
}

export async function fetchProductById(id: number): Promise<IProduct> {
    if (id <= 0) {
        throw new DataError (`Invalid product ID: ${id}`, "id");
    }

    const response = await fetch(`${BASE_URL}/products/${id}`);

    if (!response.ok) {
        throw new NetworkError(`Failed to fetch product ${id}: ${response.statusText}`, response.status);
    }

    const data = (await response.json()) as IProduct;

    if (!data || !data.title) {
        throw new DataError("API response is missing required fields", "id or title");
    }

    return data;
}