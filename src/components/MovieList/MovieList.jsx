import { Link, useLocation } from "react-router-dom";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={css.item}>
          <Link
            to={`/movies/${id}`}
            state={{ from: `${location.pathname}${location.search}` }}
          >
            <img
              className={css.img}
              src={
                poster_path
                  ? `${IMAGE_BASE_URL}${poster_path}`
                  : "https://placehold.co/200x300?text=No+Image"
              }
              alt={title}
              width={200}
            />
            <p className={css.title}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
