import { Skeleton } from "antd";
import SkeletonImage from "antd/lib/skeleton/Image";
import "antd/lib/skeleton/style/index.css";
import React from "react";
import { generatePath, Link } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper";
import 'swiper/css';
import "swiper/css/lazy";
import { Swiper, SwiperSlide } from 'swiper/react';
import { movieImg } from "../../constants/api";
import { MOVIE_DETAIL_PATH } from "../../constants/path";
import { categories, times } from "../../constants/tmdb";
import useMovie from "../../hooks/useMovie";
import { movieServices } from "../../services/movie";
import financial from "../../utils/financial";
import './hero-slide.scss';

export default function HeroSlide() {
    const { data: movies, loading: loadingSlide } = useMovie(movieServices.getTrending(categories.movie, times.week), [])
    // console.log(movies);

    return (
        <section className="hero">
            <Swiper
                modules={ [Pagination, Navigation, Autoplay] }
                spaceBetween={ 0 }
                slidesPerView={ 1 }
                pagination={ { clickable: true, dynamicBullets: true } }
                // loop={ true }
                // autoplay={ {
                //     delay: 5000,
                //     disableOnInteraction: false,
                // } }
                // onSwiper={ (swiper) => {
                //     window.addEventListener("mouseover", () => {
                //         swiper.autoplay.stop()
                //     })
                //     window.addEventListener("mouseout", () => {
                //         swiper.autoplay.start()
                //     })
                // } }

            >
                {
                    (loadingSlide) ? <SwiperSlide >
                        <div className="movie">
                            <div className="container">
                                <div className="movie__content">
                                    <Skeleton paragraph={ { rows: 4 } } style={ { width: 500, height: "100%" } } active />
                                </div>
                                <figure className="movie__thumbnail">
                                    <SkeletonImage active style={ { width: 500, height: 700 } } />
                                </figure>
                            </div>
                        </div>
                    </SwiperSlide> :
                        movies && movies.slice(0, 10).map((movie, i) => {
                            // console.log(movie);
                            return <SwiperSlide key={ i } style={ { backgroundImage: `url(${movieImg.originalImg(movie?.backdrop_path || movie?.poster_path)})` } }>
                                <div className="movie">
                                    <div className="container">
                                        <div className="movie__content">
                                            <h1 className="movie__content-title heading --h1">
                                                { movie?.title }
                                            </h1>
                                            <ul>
                                                <li className="vote">{ financial(movie?.vote_average) }</li>
                                                <li>Release: { movie?.release_date }</li>
                                            </ul>
                                            <p className="movie__content-des">
                                                { movie?.overview }
                                            </p>
                                        </div>
                                        <figure className="movie__thumbnail">
                                            <Link to={ generatePath(MOVIE_DETAIL_PATH, {
                                                category: 'movie',
                                                slug: movie?.title || movie?.name,
                                                id: movie?.id
                                            }) }>
                                                <img loading="lazy" src={ movieImg.w500Img(movie?.poster_path || movie?.backdrop_path) } alt={ movie.title || movie?.name } />
                                            </Link>
                                            <figcaption>{movie?.title || movie?.name}</figcaption>
                                        </figure>
                                    </div>
                                </div>
                            </SwiperSlide>
                        })
                }
            </Swiper>
        </section >
    )
}
