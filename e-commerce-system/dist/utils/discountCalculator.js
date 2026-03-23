"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDiscount = calculateDiscount;
function calculateDiscount(price, discountPercentage) {
    if (price < 0) {
        throw new RangeError("Price cannot be negative.");
    }
    if (discountPercentage < 0 || discountPercentage > 100) {
        throw new RangeError("Discount percentage must be between 0 and 100.");
    }
    const discountAmount = price * (discountPercentage / 100);
    return Math.round(discountAmount * 100) / 100;
}
