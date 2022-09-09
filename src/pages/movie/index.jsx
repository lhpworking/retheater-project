import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieList from "../../components/movie-list/MovieList";
import Pagination from "../../components/pagination/Pagination";

export default function Catalog() {
  const { category, type } = useParams();

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="catalog ">
      <div className="container">
        <MovieList
          category={ category }
          type={ type === "day" ? "day" : type }
          time={ type === "day" ? "day" : "" }

        />
        <Pagination totalPage />
      </div>
    </section>
  );
}
