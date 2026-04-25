import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/search?query=${encodeURIComponent(trimmed)}`);
    setQuery("");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        🍽️ Recipe Discovery
      </Link>
      <form onSubmit={handleSearch} className="navbar__search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes..."
          className="navbar__input"
          aria-label="Search recipes"
        />
        <button type="submit" className="navbar__button">
          Search
        </button>
      </form>
      <div className="navbar__links">
        <Link to="/" className="navbar__link">
          Home
        </Link>
        <Link to="/favorites" className="navbar__link">
          ❤️ Favorites
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
