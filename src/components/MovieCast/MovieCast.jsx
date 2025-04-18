import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../tmdb-api";
import css from "./MovieCast.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const data = await getMovieCredits(movieId);
        setCast(data);
      } catch (error) {
        setError("Не вдалося завантажити акторів 😢");
        console.log(error);
      }
    };
    fetchCast();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!cast.length) return <p>Немає даних про акторів.</p>;

  return (
    <ul className={css.castList}>
      {cast.map(({ id, name, character, profile_path }) => (
        <li className={css.castItem} key={id}>
          <img
            className={css.img}
            src={
              profile_path
                ? `${IMAGE_BASE_URL}${profile_path}`
                : "https://placehold.co/100x150?text=No+Photo"
            }
            alt={name}
            width={100}
          />
          <div>
            <p className={css.itemName}>{name}</p>
            <p className={css.itemRole}>Роль: {character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
