import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import FavoriteCard from "../components/FavoriteCard";

function FavoritesPage() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="empty-state">
        <h2>No favorites yet</h2>
        <p>Browse recipes and hit "Add to Favorites" to save them here.</p>
        <Link to="/" className="btn btn--primary">
          Browse Recipes
        </Link>
      </div>
    );
  }

  return (
    <section>
      <h1 className="page-title">❤️ Your Favorites</h1>
      <div className="grid">
        {favorites.map((id) => (
          <FavoriteCard key={id} mealId={id} />
        ))}
      </div>
    </section>
  );
}

export default FavoritesPage;
