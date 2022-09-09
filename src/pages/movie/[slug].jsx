import { Skeleton } from "antd";
import SkeletonImage from "antd/lib/skeleton/Image";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "swiper/css";
import Button from "../../components/button/Button";
import MySwiper from "../../components/Swiper/Swiper";
import { movieImg } from "../../constants/api";
import useMovie from "../../hooks/useMovie";
import { movieServices } from "../../services/movie";
import financial from "../../utils/financial";
import "./movie.scss";

export default function Detail() {
  const { id, category } = useParams();

  const { data: movie, loading: loading } = useMovie(
    movieServices.getDetails(category, id),
    [category, id]
  );
  // console.log(movie);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return loading ? (
    <div
      className="container"
      style={ { display: "flex", alignItems: "center", marginTop: 100 } }
    >
      <SkeletonImage
        active
        style={ { width: 500, height: 700, marginRight: 50 } }
      />
      <Skeleton active paragraph={ { rows: 6 } } />
    </div>
  ) : (
    movie && (
      <>
        <section className="movie-detail">
          <div
            className="back-drop"
            style={ {
              backgroundImage: `url(${movieImg.originalImg(
                movie?.backdrop_path
              )})`,
            } }
          >
            <div className="container">
              <figure>
                <img
                  src={ movieImg.w500Img(
                    movie?.poster_path || movie?.backdrop_path
                  ) }
                  alt={ movie?.title || movie?.name }
                />
                <Button className="btn-primary">Watch Movie</Button>
              </figure>
              <div className="movie-detail__info">
                <h1 className="heading --h1">{ movie?.title || movie?.name }</h1>
                <small className="tag-line">{ movie?.tagline }</small>
                <ul className="genres">
                  { movie.genres &&
                    movie.genres.map((item, i) => {
                      return <li key={ i }> { item.name }</li>;
                    }) }
                </ul>
                <ul className="about">
                  <li className="vote">{ financial(movie?.vote_average) }</li>
                  <li>Popularity: { movie?.popularity }</li>
                  <li>
                    Release Date: { movie?.release_date || movie?.first_air_date }
                  </li>

                </ul>
                <div className="overview">
                  <h3 className="heading --h3">Overview</h3>
                  <p>{ movie?.overview }</p>
                  { !movie?.created_by ? (
                    ""
                  ) : (
                    <ul>
                      { movie.created_by &&
                        movie?.created_by.map((item, i) => {
                          return (
                            <li key={ i }>
                              <figure>
                                <img
                                  src={ movieImg.originalImg(item?.profile_path) }
                                  alt={ item?.name }
                                />
                                <figcaption>{ item?.name }</figcaption>
                                <small className="department">creator</small>
                              </figure>
                            </li>
                          );
                        }) }
                    </ul>
                  ) }
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="movie-cast section">
          <div className="container">
            <MySwiper
              category={ category }
              id={ id }
              heading="cast"
              slidesPerView={ 5 }
              spaceBetween={ 25 }
            />
          </div>
        </section>
        <section className="movie-trailer section">
          <div className="container">
            <MySwiper
              category={ category }
              id={ id }
              heading="trailer"
              slidesPerView={ 3 }
              spaceBetween={ 25 }
            />
          </div>
        </section>
        <section className="movie-similar section">
          <div className="container">
            <MySwiper
              category={ category }
              id={ id }
              heading="similar"
              slidesPerView={ 5 }
              spaceBetween={ 25 }
            />
          </div>
        </section>
      </>
    )
  );
}
