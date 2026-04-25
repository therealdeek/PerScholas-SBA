/// src/pages/RecipeDetailPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { useFavorites } from "../context/FavoritesContext";
import type { MealDetail } from "../types";

interface MealDetailResponse {
  meals: MealDetail[] | null;
}

function getIngredients(
  meal: MealDetail
): { ingredient: string; measure: string }[] {
  const ingredients: { ingredient: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    // TheMealDB pads unused slots with empty strings or null —
    // we skip those to avoid rendering empty list items.
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }

  return ingredients;
}

function RecipeDetailPage() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const { data, loading, error } = useFetch<MealDetailResponse>(
    recipeId
      ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
      : ""
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data?.meals?.[0]) return <ErrorMessage message="Recipe not found." />;

  const meal = data.meals[0];
  const ingredients = getIngredients(meal);
  const favorited = isFavorite(meal.idMeal);

  const handleFavoriteToggle = (): void => {
    if (favorited) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal.idMeal);
    }
  };

  return (
    <article className="recipe-detail">
      <button
        onClick={() => navigate(-1)}
        className="back-link"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        &#8592; Back
      </button>

      <div className="recipe-detail__header">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="recipe-detail__image"
        />

        <div className="recipe-detail__meta">
          <h1 className="recipe-detail__title">{meal.strMeal}</h1>

          <div className="recipe-detail__tags">
            <span className="tag">&#128194; {meal.strCategory}</span>
            <span className="tag">&#127758; {meal.strArea}</span>
          </div>

          {/* Favorite toggle — label and style flip based on current state */}
          <button
            onClick={handleFavoriteToggle}
            className={`btn ${favorited ? "btn--outline" : "btn--primary"}`}
            aria-label={
              favorited ? "Remove from favorites" : "Add to favorites"
            }
          >
            {favorited ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
          </button>

          {/* Ingredients */}
          <div className="recipe-detail__ingredients">
            <h2>Ingredients</h2>
            <ul className="ingredients-list">
              {ingredients.map(({ ingredient, measure }) => (
                <li key={ingredient} className="ingredients-list__item">
                  <span className="ingredients-list__name">{ingredient}</span>
                  <span className="ingredients-list__measure">{measure}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {meal.strYoutube && (
        <a
          href={meal.strYoutube}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--outline"
        >
          &#9654; Watch on YouTube
        </a>
      )}

      <div className="recipe-detail__instructions">
        <h2>Instructions</h2>
        {meal.strInstructions
          .split("\n")
          .filter(Boolean)
          .map((step, i) => (
            <p key={i}>{step}</p>
          ))}
      </div>
    </article>
  );
}

export default RecipeDetailPage;