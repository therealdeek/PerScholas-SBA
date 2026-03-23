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
    reviews: Review[];
    returnPolicy: string;
    mininumOrderQuantity: number;
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