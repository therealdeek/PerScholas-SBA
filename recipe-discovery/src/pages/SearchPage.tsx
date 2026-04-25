import { useSearchParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";
import type { MealSummary } from "../types";

interface SearchResponse {
  meals: MealSummary[] | null;
}

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const { data, loading, error } = useFetch<SearchResponse>(
    query
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
      : "",
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <Link to="/" className="back-link">
        ← Back to Categories
      </Link>

      <h1 className="page-title">Results for "{query}"</h1>

      {!data?.meals ? (
        <div className="empty-state">
          <h2>No results found</h2>
          <p>Try a different search term.</p>
        </div>
      ) : (
        <div className="grid">
          {data.meals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </section>
  );
}

export default SearchPage;
