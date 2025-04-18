import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import { searchMovies } from "../../tmdb-api";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        const results = await searchMovies(query);
        setMovies(results);
        setError(results.length === 0 ? "Нічого не знайдено." : null);
      } catch (error) {
        setError("Щось пішло не так. Спробуй ще раз");
        console.log(error);
      }
    };
    fetchData();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = searchTerm.trim();
    if (trimmed === "") return;

    if (trimmed.toLowerCase() !== query.toLowerCase()) {
      setSearchParams({ query: trimmed });
    }

    setSearchTerm("");
  };

  return (
    <div>
      <h1 className={css.title}>Пошук фільмів</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Введи назву фільму..."
        />
        <button type="submit">Знайти фільм</button>
      </form>

      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
