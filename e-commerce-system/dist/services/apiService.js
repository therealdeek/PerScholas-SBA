"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllProducts = fetchAllProducts;
exports.fetchProductById = fetchProductById;
const errorHandler_js_1 = require("../utils/errorHandler.js");
const BASE_URL = "https://dummyjson.com";
async function fetchAllProducts() {
    const response = await fetch(`${BASE_URL}/products?limit=0`);
    if (!response.ok) {
        throw new errorHandler_js_1.NetworkError(`Failed to fetch products: ${response.statusText}`, response.status);
    }
    const data = (await response.json());
    if (!data.products || !Array.isArray(data.products)) {
        throw new errorHandler_js_1.DataError("API response is missing products array", "products");
    }
    return data.products;
}
async function fetchProductById(id) {
    if (id <= 0) {
        throw new errorHandler_js_1.DataError(`Invalid product ID: ${id}`, "id");
    }
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
        throw new errorHandler_js_1.NetworkError(`Failed to fetch product ${id}: ${response.statusText}`, response.status);
    }
    const data = (await response.json());
    if (!data || !data.title) {
        throw new errorHandler_js_1.DataError("API response is missing required fields", "id or title");
    }
    return data;
}
