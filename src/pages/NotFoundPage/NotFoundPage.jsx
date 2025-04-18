import { useNavigate } from "react-router-dom";
import css from "./NotFoundPage.module.css";
import { useEffect } from "react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={css.notFound}>
      Сторінку не знайдено. Повертаємо на головну...
    </div>
  );
};

export default NotFoundPage;
