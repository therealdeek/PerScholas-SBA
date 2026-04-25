import { Link } from "react-router-dom";
import type { MealSummary } from "../types";

// Props are exactly one MealSummary object.
// We import the type we already defined — no re-defining shapes here.
interface RecipeCardProps {
  meal: MealSummary;
}

function RecipeCard({ meal }: RecipeCardProps) {
  return (
    // Link from React Router renders an <a> tag that doesn't
    // trigger a full page reload — it's client-side navigation.
    // React Router docs: https://reactrouter.com/en/main/components/link
    <Link to={`/recipe/${meal.idMeal}`} className="recipe-card">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="recipe-card__image"
        // loading="lazy" defers off-screen images — important for
        // pages that render a grid of 20+ cards at once.
        loading="lazy"
      />
      <div className="recipe-card__body">
        <h3 className="recipe-card__title">{meal.strMeal}</h3>
      </div>
    </Link>
  );
}

export default RecipeCard;
