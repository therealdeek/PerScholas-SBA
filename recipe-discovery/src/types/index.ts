// A single category from /categories.php
export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

// A recipe summary (returned when filtering by category or searching)
export interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

// A full recipe detail (returned from /lookup.php?i=ID)
export interface MealDetail extends MealSummary {
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube: string;
  strSource: string;
  // TheMealDB stores ingredients as strIngredient1...strIngredient20
  // We'll handle this with a utility function later
  [key: string]: string | null; // index signature for dynamic ingredient keys
}

// What useFetch returns
export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// What FavoritesContext exposes
export interface FavoritesContextType {
  favorites: string[]; // array of meal IDs
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}
