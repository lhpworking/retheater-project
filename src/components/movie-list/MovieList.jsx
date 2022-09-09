import SkeletonImage from 'antd/lib/skeleton/Image';
import SkeletonInput from 'antd/lib/skeleton/Input';
import 'antd/lib/skeleton/style/index.css';
import { useEffect, useState } from "react";
import { generatePath, Link } from "react-router-dom";
import { movieImg } from '../../constants/api';
import { MOVIE_DETAIL_PATH } from "../../constants/path";
import { categories, movieType } from '../../constants/tmdb';
import { movieServices } from '../../services/movie';
import './movie-list.scss';

const MovieList = props => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const getList = async () => {
            setLoading(true)
            let response = null
            const params = { page: 1 }

            if (props.type !== "similar") {
                switch (props.category) {
                    case categories.movie:
                        if (props.time) {
                            response = await movieServices.getTrending(props.category, props.time)
                            setData(response.results.slice(0, props.sliceNum))
                            setLoading(false)
                            break
                        }

                        response = await movieServices.getMovies(props.type, { params })
                        console.log(params);

                        setData(response.results.slice(0, props.sliceNum))
                        if (props.type === movieType.upcoming) setData(response.results.slice(0, props.sliceNum))
                        setLoading(false)
                        break;

                    default:
                        response = await movieServices.getTVShows(props.type, { params })
                        setData(response.results.slice(0, props.sliceNum))
                        setLoading(false)
                }
            } else {
                response = await movieServices.getSimilar(props.category, props.id)
                setData(response.results)
                setLoading(false)
            }
        }
        getList()
    }, [])


    return (
        <div className="card-layout">
            {
                (loading) ? [...Array(5)].map((_, i) => {
                    return <div key={ i }>
                        <SkeletonImage active style={ { marginBottom: "1rem", width: 200, height: 300 } } />
                        <SkeletonInput size='small' />
                    </div>
                }) :
                    data && data.map((movie, i) => {
                        return (
                            <Link
                                to={ generatePath(MOVIE_DETAIL_PATH, {
                                    category: categories[props.category],
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
        </div >
    )
}
export default MovieList;
