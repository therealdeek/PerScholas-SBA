import { Product } from "./models/Product.js";
import { fetchAllProducts, fetchProductById } from "./services/apiService.js";
import { handleError } from "./utils/errorHandler.js";

/**
 * Displays a summary of a small selection of products.
 * We limit to 5 products to keep the console output readable.
 *
 * @param products - Array of Product instances to display
 */
function displayProductSummary(products: Product[]): void {
  console.log("\n========================================");
  console.log(`  PRODUCT CATALOG (showing ${products.length} products)`);
  console.log("========================================\n");

  products.forEach((product, index) => {
    console.log(`--- Product ${index + 1} ---`);
    console.log(product.displayDetails());
    console.log(
      `  Discounted Price: $${product.getPriceWithDiscount().toFixed(2)}`,
    );
    console.log();
  });
}

/**
 * Fetch a single product by ID and display its details.
 * Demonstrates fetchProductById and individual Product instantiation.
 *
 * @param id - The numeric product ID to fetch
 */
async function displaySingleProduct(id: number): Promise<void> {
  console.log("\n========================================");
  console.log(`  SINGLE PRODUCT LOOKUP — ID: ${id}`);
  console.log("========================================\n");

  // fetchProductById validates the ID and throws DataError if invalid
  const data = await fetchProductById(id);
  const product = new Product(data);

  console.log(product.displayDetails());
  console.log(
    `  Discounted Price: $${product.getPriceWithDiscount().toFixed(2)}`,
  );
}

/**
 * Main application function.
 *
 * async/await is used throughout — each await pauses execution of THIS
 * function only, not the entire program. Other operations can still run.
 *
 * The try/catch blocks ensure that any error — network, data, or
 * unexpected — is caught and handled gracefully via handleError().
 */
async function main(): Promise<void> {
  console.log("Starting E-Commerce Product Management System...\n");

  // ── Step 1: Fetch all products ─────────────────────────────────────────────
  try {
    console.log("Fetching product catalog from DummyJSON API...");

    const allProductData = await fetchAllProducts();

    console.log(`✓ Successfully fetched ${allProductData.length} products.\n`);

    // Instantiate Product objects from raw API data
    // We map each raw IProduct object into a typed Product class instance
    const allProducts = allProductData.map((data) => new Product(data));

    // Slice to first 5 for readable output — the full catalog has 194 products
    const previewProducts = allProducts.slice(0, 5);

    displayProductSummary(previewProducts);
  } catch (error) {
    // handleError determines whether it's a NetworkError, DataError, or other
    handleError(error);
  }

  // ── Step 2: Fetch a single product by ID ───────────────────────────────────
  try {
    await displaySingleProduct(1);
  } catch (error) {
    handleError(error);
  }

  // ── Step 3: Demonstrate error handling with an invalid ID ──────────────────
  try {
    console.log("\n========================================");
    console.log("  DEMONSTRATING ERROR HANDLING");
    console.log("========================================\n");

    console.log("Attempting to fetch product with ID -1 (invalid)...");

    // This will throw a DataError because id <= 0
    // fetchProductById validates the ID before making any network request
    await displaySingleProduct(-1);
  } catch (error) {
    handleError(error);
    console.log("✓ Error was caught and handled gracefully.\n");
  }

  console.log("\n========================================");
  console.log("  APPLICATION COMPLETE");
  console.log("========================================\n");
}

// ── Entry Point ───────────────────────────────────────────────────────────────
// We call main() and attach a .catch() as a final safety net.
// If something throws inside main() that wasn't caught by a try/catch block,
// this prevents a silent unhandled Promise rejection.
main().catch(handleError);
