
export function calculateDiscount (
    price: number,
    discountPercentage: number
): number {
    if (price < 0 ) {
        throw new RangeError ("Price cannot be negative.");
    }
    if (discountPercentage < 0 || discountPercentage > 100) {
        throw new RangeError ("Discount percentage must be between 0 and 100.");
    }
    return price * (discountPercentage / 100);
}


