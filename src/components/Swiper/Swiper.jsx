import React, { useEffect, useRef, useState } from "react";

// import Swiper core and required modules
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import SkeletonImage from "antd/lib/skeleton/Image";
import { generatePath, Link } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { movieImg } from "../../constants/api";
import { MOVIE_DETAIL_PATH } from "../../constants/path";
import { movieServices } from "../../services/movie";
import './swiper.scss';

export default function MySwiper(props) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
        let response = null
        window.scroll({
            top: 0,
            behavior: "smooth"
        })
        const getDetail = async () => {
            setLoading(true)
            switch (props.heading) {
                case "similar":
                    response = await movieServices.getSimilar(props.category, props.id)
                    // console.log(response);
                    setData(response)
                    setLoading(false)
                    break
                case "cast":
                    response = await movieServices.getCredits(props.category, props.id)
                    setData(response)
                    setLoading(false)
                    break;

                default:
                    response = await movieServices.getVideos(props.category, props.id)
                    // console.log(response);
                    setData(response)
                    setLoading(false)

            }
        }
        getDetail()
    }, [props.id, props.category])

    return (
        <>
            <div className="movie-title">
                <h2 className=" heading --h2"> { props.heading } </h2>
                <div className="navigation">
                    <div className="arrow" ref={ prevRef }><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg></div>
                    <div className="arrow" ref={ nextRef }><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg></div>
                </div>

            </div>

            <Swiper
                modules={ [Navigation, Pagination, Scrollbar, A11y] }
                breakpoints={ {

                    576: {
                        // width: 576,
                        slidesPerView: props.slidesPerView - 1,
                    },
                    768: {
                        // width: 768,
                        slidesPerView: props.slidesPerView,
                    },

                } }
                spaceBetween={ props.spaceBetween }
                slidesPerView={ props.slidesPerView - 2 }
                onInit={ (swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                } }
            >
                {
                    (loading) ? [...Array(5)].map((_, i) => {
                        return <SwiperSlide key={ i }>
                            <SkeletonImage active style={ { width: 200 } } />
                        </SwiperSlide>
                    }) :
                        data.cast ? data.cast && data.cast.map((item, i) => {
                            return <SwiperSlide key={ i }>
                                <figure>
                                    <img loading="lazy" src={ movieImg.originalImg(item?.profile_path) } alt={ item?.name } />
                                    <figcaption>{ item?.name }</figcaption>
                                    <small>{ item?.character }</small>
                                </figure>
                            </SwiperSlide>;
                        }) : data.results && data.results.map((item, i) => {
                            if (props.heading === 'trailer') {
                                return <SwiperSlide key={ i }>
                                    <iframe src={ `https://www.youtube.com/embed/${item?.key}` } title={ item?.name } allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                                </SwiperSlide>
                            } else {
                                return (
                                    <SwiperSlide key={ i }>
                                        <figure>
                                            <Link to={ generatePath(MOVIE_DETAIL_PATH, {
                                                category: props.category,
                                                slug: item?.title || item?.name,
                                                id: item?.id
                                            }) }>
                                                <img loading="lazy" src={ movieImg.w500Img(item?.poster_path || item?.backdrop_path) } alt="" />
                                            </Link>
                                            <figcaption>{ item?.title || item?.name }</figcaption>
                                        </figure>
                                    </SwiperSlide>
                                )
                            }

                        })
                }
            </Swiper>
        </>
    );
}
