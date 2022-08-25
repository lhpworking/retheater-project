import React from "react";
import { A11y, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export default function Home() {
    return (
        <section className="hero">
            <Swiper
                modules={ [Pagination, A11y] }
                spaceBetween={ 0 }
                slidesPerView={ 1 }
                pagination={ { clickable: true } }
            >
                <SwiperSlide >
                    <figure>
                        <img src="https://images.unsplash.com/photo-1661347257861-e3e4fb542541?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80" alt="https://images.unsplash.com/photo-1661347257861-e3e4fb542541?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80" />
                    </figure>
                    <div className="movie">
                        <div className="container">
                            <div className="movie__content">
                                <h1 className="movie__content-title heading --h1">
                                    Baby
                                </h1>
                                <p className="movie__content-des">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae debitis doloribus recusandae asperiores quo ea fugiat voluptate earum? Earum placeat error explicabo, recusandae facilis esse dolore atque? Id, assumenda earum.
                                </p>
                            </div>
                            <figure className="movie__thumbnail">
                                <img src="https://images.unsplash.com/photo-1661347257861-e3e4fb542541?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80" alt="" />
                            </figure>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
            </Swiper>
        </section >
    )
}
