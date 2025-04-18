import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { getMovieDetails } from "../../tmdb-api";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from || "/movies");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError("Не вдалося завантажити інформацію про фільм 😢");
        console.log(error);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Завантаження...</p>;

  const { title, poster_path, overview, release_date, vote_average } = movie;

  return (
    <div>
      <Link className={css.backLink} to={backLinkHref.current}>
        Назад
      </Link>

      <div className={css.detailsWrapper}>
        <img
          src={
            poster_path
              ? `${IMAGE_BASE_URL}${poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={title}
          width={300}
        />

        <div>
          <h2>{title}</h2>
          <p>
            <strong>Дата релізу:</strong> {release_date}
          </p>
          <p>
            <strong>Оцінка:</strong> {vote_average}
          </p>
          <p>
            <strong>Опис:</strong> {overview}
          </p>

          <span className={css.line}></span>

          <h3 className={css.additionalInfoTitle}>Додаткова інформація:</h3>
          <ul className={css.navList}>
            <li>
              <NavLink className={buildLinkClass} to="cast">
                Актори
              </NavLink>
            </li>
            <li>
              <NavLink className={buildLinkClass} to="reviews">
                Відгуки
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <span className={css.line}></span>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
