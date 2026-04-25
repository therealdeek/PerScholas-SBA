import { Link } from "react-router-dom";
import type { MealSummary } from "../types";

interface RecipeCardProps {
  meal: MealSummary;
}

function RecipeCard({ meal }: RecipeCardProps) {
  return (
    <Link to={`/recipe/${meal.idMeal}`} className="recipe-card">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="recipe-card__image"
        loading="lazy"
      />
      <div className="recipe-card__body">
        <h3 className="recipe-card__title">{meal.strMeal}</h3>
      </div>
    </Link>
  );
}

export default RecipeCard;
