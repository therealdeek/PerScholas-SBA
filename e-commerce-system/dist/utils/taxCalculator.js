"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTax = calculateTax;
const errorHandler_js_1 = require("./errorHandler.js");
const STANDARD_TAX_RATE = 0.0475;
const GROCERY_TAX_RATE = 0.03;
function calculateTax(price, category) {
    if (price < 0) {
        throw new RangeError("Price cannot be negative.");
    }
    if (!category || category.trim() === "") {
        throw new errorHandler_js_1.DataError("Product category is missing or empty", "category");
    }
    const rate = category.toLowerCase() === "groceries"
        ? GROCERY_TAX_RATE
        : STANDARD_TAX_RATE;
    const taxAmount = price * rate;
    return Math.round(taxAmount * 100) / 100;
}
