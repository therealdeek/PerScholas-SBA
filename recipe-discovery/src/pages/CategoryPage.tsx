import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";
import type { MealSummary } from "../types";

interface MealsResponse {
  meals: MealSummary[] | null;
}

function CategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();

  const { data, loading, error } = useFetch<MealsResponse>(
    categoryName
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(categoryName)}`
      : "",
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  if (!data?.meals) {
    return <ErrorMessage message={`No recipes found for "${categoryName}".`} />;
  }

  return (
    <section>
      <Link to="/" className="back-link">
        ← Back to Categories
      </Link>

      <h1 className="page-title">{categoryName}</h1>

      <div className="grid">
        {data.meals.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </section>
  );
}

export default CategoryPage;
