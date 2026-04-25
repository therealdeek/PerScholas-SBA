import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "./Spinner";
import type { MealDetail } from "../types";

interface MealDetailResponse {
  meals: MealDetail[] | null;
}

interface FavoriteCardProps {
  mealId: string;
}

function FavoriteCard({ mealId }: FavoriteCardProps) {
  const { data, loading } = useFetch<MealDetailResponse>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
  );

  if (loading)
    return (
      <div className="recipe-card">
        <Spinner />
      </div>
    );

  const meal = data?.meals?.[0];
  if (!meal) return null;

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
        <p className="recipe-card__category">{meal.strCategory}</p>
      </div>
    </Link>
  );
}

export default FavoriteCard;
