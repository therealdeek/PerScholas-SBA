"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const discountCalculator_js_1 = require("../utils/discountCalculator.js");
const taxCalculator_js_1 = require("../utils/taxCalculator.js");
class Product {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.category = data.category;
        this.price = data.price;
        this.discountPercentage = data.discountPercentage;
        this.rating = data.rating;
        this.stock = data.stock;
        this.tags = data.tags;
        this.brand = data.brand;
        this.sku = data.sku;
        this.weight = data.weight;
        this.dimensions = data.dimensions;
        this.warrantyInformation = data.warrantyInformation;
        this.shippingInformation = data.shippingInformation;
        this.availabilityStatus = data.availabilityStatus;
        this.reviews = data.reviews;
        this.returnPolicy = data.returnPolicy;
        this.minimumOrderQuantity = data.minimumOrderQuantity;
        this.meta = data.meta;
        this.thumbnail = data.thumbnail;
        this.images = data.images;
    }
    /**
     * Returns summary of the product's core details.
     * Calling both utility functions so output is always accurate.
     */
    displayDetails() {
        const discount = (0, discountCalculator_js_1.calculateDiscount)(this.price, this.discountPercentage);
        const tax = (0, taxCalculator_js_1.calculateTax)(this.price, this.category);
        const finalPrice = this.price - discount + tax;
        return (`[${this.category.toUpperCase()}] ${this.title}\n` +
            `  SKU:          ${this.sku}\n` +
            `  Brand:        ${this.brand ?? "N/A"}\n` +
            `  Base Price:   $${this.price.toFixed(2)}\n` +
            `  Discount:     -$${discount.toFixed(2)}\n` +
            `  Tax:          +$${tax.toFixed(2)}\n` +
            `  Final Price:  $${finalPrice.toFixed(2)}\n` +
            `  Rating:       ${this.rating}/5\n` +
            `  Stock:        ${this.stock} units (${this.availabilityStatus})\n` +
            `  Ships:        ${this.shippingInformation}`);
    }
    /**
     * the final price is returned after discount is applied.
     * Does NOT include tax — that is a separate concern handled in displayDetails.
     *
     * Example: price = $100, discountPercentage = 10
     * calculateDiscount returns $10 → this method returns $90
     */
    getPriceWithDiscount() {
        const discount = (0, discountCalculator_js_1.calculateDiscount)(this.price, this.discountPercentage);
        return this.price - discount;
    }
}
exports.Product = Product;
