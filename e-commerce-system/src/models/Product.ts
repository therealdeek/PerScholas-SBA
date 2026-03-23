import { calculateDiscount } from "../utils/discountCalculator.js";
import { calculateTax } from "../utils/taxCalculator.js";

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  rating: number;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  thumbnail: string;
  images: string[];
}

export interface ProductsApiResponse {
  products: IProduct[];
  total: number;
  limit: number;
  skip: number;
}

export class Product implements IProduct {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly price: number;
  readonly discountPercentage: number;
  readonly rating: number;
  readonly stock: number;
  readonly tags: string[];
  readonly brand?: string;
  readonly sku: string;
  readonly weight: number;
  readonly dimensions: Dimensions;
  readonly warrantyInformation: string;
  readonly shippingInformation: string;
  readonly availabilityStatus: string;
  readonly reviews: Review[];
  readonly returnPolicy: string;
  readonly minimumOrderQuantity: number;
  readonly meta: ProductMeta;
  readonly thumbnail: string;
  readonly images: string[];

  constructor(data: IProduct) {
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
  displayDetails(): string {
    const discount = calculateDiscount(this.price, this.discountPercentage);
    const tax = calculateTax(this.price, this.category);
    const finalPrice = this.price - discount + tax;

    return (
      `[${this.category.toUpperCase()}] ${this.title}\n` +
      `  SKU:          ${this.sku}\n` +
      `  Brand:        ${this.brand ?? "N/A"}\n` +
      `  Base Price:   $${this.price.toFixed(2)}\n` +
      `  Discount:     -$${discount.toFixed(2)}\n` +
      `  Tax:          +$${tax.toFixed(2)}\n` +
      `  Final Price:  $${finalPrice.toFixed(2)}\n` +
      `  Rating:       ${this.rating}/5\n` +
      `  Stock:        ${this.stock} units (${this.availabilityStatus})\n` +
      `  Ships:        ${this.shippingInformation}`
    );
  }

  /**
   * the final price is returned after discount is applied.
   * Does NOT include tax — that is a separate concern handled in displayDetails.
   *
   * Example: price = $100, discountPercentage = 10
   * calculateDiscount returns $10 → this method returns $90
   */
  getPriceWithDiscount(): number {
    const discount = calculateDiscount(this.price, this.discountPercentage);
    return this.price - discount;
  }
}