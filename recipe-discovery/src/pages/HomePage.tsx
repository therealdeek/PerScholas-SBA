import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import type { Category } from "../types";

interface CategoriesResponse {
  categories: Category[];
}

function HomePage() {
  const { data, loading, error } = useFetch<CategoriesResponse>(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
  );
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data?.categories) return <ErrorMessage message="No categories found." />;

  return (
    <section>
      <h1 className="page-title">Browse Categories</h1>
      <div className="grid">
        {data.categories.map((category) => (
          <Link
            key={category.idCategory}
            to={`/category/${encodeURIComponent(category.strCategory)}`}
            className="category-card"
          >
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              className="category-card__image"
              loading="lazy"
            />
            <div className="category-card__body">
              <h2 className="category-card__title">{category.strCategory}</h2>
              <p className="category-card__desc">
                {category.strCategoryDescription.slice(0, 80)}...
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default HomePage;
