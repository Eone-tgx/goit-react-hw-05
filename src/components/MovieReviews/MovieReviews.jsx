import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../tmdb-api";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError("Не вдалося завантажити відгуки 😢");
        console.log(error);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!reviews.length) return <p>Немає рецензій для цього фільму.</p>;

  return (
    <ul>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={css.reviewsItem}>
          <p className={css.reviewAuthor}>{author} написав(ла):</p>
          <p className={css.reviewText}>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
