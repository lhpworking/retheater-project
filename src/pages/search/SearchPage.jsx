import React, { useEffect, useState } from "react";
import { generatePath, Link } from "react-router-dom";
import MovieList from "../../components/movie-list/MovieList";
import { movieImg } from "../../constants/api";
import { MOVIE_DETAIL_PATH } from "../../constants/path";
import { categories, times } from "../../constants/tmdb";
import { movieServices } from "../../services/movie";
import './search.scss';


export default function SearchPage() {
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    useEffect(() => {

        window.scroll({
            top: 0,
            behavior: "smooth"
        })

        const searchMovie = async () => {

            try {
                const res = await movieServices.getSearch(`?query=${search}`)
                setData(res.results)
            } catch (error) {
                console.log("error:", error);
            }
        }
        searchMovie()
    }, [search])

    return (
        <section className="search section">
            <div className="container">
                <div className="search__block">
                    <input
                        type="text"
                        value={ search }
                        onChange={ (ev) => setSearch(ev.target.value) } placeholder="Search.." />
                </div>
                {
                    search === '' ?
                        <MovieList category={ categories.movie } time={ times.week } />
                        : <div className="card-layout">
                            {
                                data.map((movie, i) => {
                                    return (
                                        <Link
                                            to={ generatePath(MOVIE_DETAIL_PATH, {
                                                category: movie?.media_type,
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

                }
            </div>
        </section>

    )
}
