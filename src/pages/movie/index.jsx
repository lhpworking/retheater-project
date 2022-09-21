import SkeletonImage from "antd/lib/skeleton/Image";
import SkeletonInput from "antd/lib/skeleton/Input";
import 'antd/lib/skeleton/style/index.css';
import { useEffect, useState } from "react";
import { generatePath, Link, useLocation, useParams } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { movieImg } from "../../constants/api";
import { MOVIE_DETAIL_PATH } from "../../constants/path";
import { movieServices } from "../../services/movie";

export default function Catalog() {
  const { category, type } = useParams();
  const { search } = useLocation()
  const currentPage = parseInt(new URLSearchParams(search).get('page') || "1")
  // console.log(currentPage);
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(null)


  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });

    const getMovie = async () => {
      setLoading(true)
      let params = { page: currentPage }
      let response = null

      if (type !== "day") {
        switch (category) {
          case "movie":
            response = await movieServices.getMovies(type, { params })
            // console.log(response);
            setData(response.results)
            setTotalPage(response.total_pages)
            setLoading(false)
            break

          default:
            response = await movieServices.getTVShows(type, { params })
            // console.log(response);
            setData(response.results)
            setTotalPage(response.total_pages)
            setLoading(false)
            break
        }

      } else {
        response = await movieServices.getTrending(category, type)
        // console.log(response);
        setData(response.results)
        setTotalPage(response.total_pages)
        setLoading(false)
      }

    }
    getMovie()
  }, [currentPage, category]);

  return (
    <section className="catalog ">
      <div className="container">
        <div className="card-layout">
          {
            (loading) ? [...Array(5)].map((_, i) => {
              return <div key={ i }>
                <SkeletonImage active style={ { marginBottom: "1rem", width: 200, height: 300 } } />
                <SkeletonInput size='small' />
              </div>
            }) : data && data.map((movie, i) => {
              return (
                <Link
                  to={ generatePath(MOVIE_DETAIL_PATH, {
                    category: category,
                    slug: movie?.title || movie?.name,
                    id: movie?.id
                  }) }
                  className="card" key={ i } >
                  <figure>
                    <img loading="lazy" src={ movieImg.w500Img(movie?.poster_path) } alt={ movie?.title || movie?.name } />
                    <figcaption>
                      { movie?.title || movie?.name }
                    </figcaption>
                  </figure>
                </Link>
              )
            })
          }
        </div>
        <Pagination totalPage={ totalPage } />
      </div>
    </section>
  );
}
