import React from "react";
import { Link, useLocation } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import HeroSlide from "../components/hero-slide/HeroSlide";
import MovieList from "../components/movie-list/MovieList";
import { categories, movieType, times, tvType } from "../constants/tmdb";
import "./movie/movie.scss";

export default function Home() {

  return (
    <>
      <HeroSlide />
      {/* nominated movie */ }
      <section className="movie-list section">
        <div className="container">
          <div className="movie-list__heading">
            <h3 className=" heading --h3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M16.5 8c0 1.5-.5 3.5-2.9 4.3.7-1.7.8-3.4.3-5-.7-2.1-3-3.7-4.6-4.6-.4-.3-1.1.1-1 .7 0 1.1-.3 2.7-2 4.4C4.1 10 3 12.3 3 14.5 3 17.4 5 21 9 21c-4-4-1-7.5-1-7.5.8 5.9 5 7.5 7 7.5 1.7 0 5-1.2 5-6.4 0-3.1-1.3-5.5-2.4-6.9-.3-.5-1-.2-1.1.3"></path>
              </svg>
              nominated movie
            </h3>
          </div>
          <MovieList
            category={ categories.movie }
            time={ times.day }
            sliceNum={ 5 }
          />
        </div>
      </section>
      {/* popular movie */ }
      <section className="movie-list section">
        <div className="container">
          <div className="movie-list__heading">
            <h3 className=" heading --h3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm.001 6c-.001 0-.001 0 0 0h-.465l-2.667-4H20l.001 4zM9.536 9 6.869 5h2.596l2.667 4H9.536zm5 0-2.667-4h2.596l2.667 4h-2.596zM4 5h.465l2.667 4H4V5zm0 14v-8h16l.002 8H4z"></path>
                <path d="m10 18 5.5-3-5.5-3z"></path>
              </svg>
              Movie Popular
            </h3>
            <Link
              to={ `/${categories.movie}/${movieType.popular}?page=${1}` }
            >
              View all
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M10.061 19.061 17.121 12l-7.06-7.061-2.122 2.122L12.879 12l-4.94 4.939z"></path>
              </svg>
            </Link>
          </div>
          <MovieList
            category={ categories.movie }
            type={ movieType.popular }
            sliceNum={ 10 }
          />
        </div>
      </section>
      {/* tv show */ }
      <section className="movie-list section">
        <div className="container">
          <div className="movie-list__heading">
            <h3 className=" heading --h3">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="M20 6h-5.586l2.293-2.293-1.414-1.414L12 5.586 8.707 2.293 7.293 3.707 9.586 6H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zM4 19V8h16l.002 11H4z"></path>
              </svg>
              Tv Shows
            </h3>
            <Link
              to={ `/${categories.tv}/${tvType.popular}?page=${1}` }
            >
              View all
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M10.061 19.061 17.121 12l-7.06-7.061-2.122 2.122L12.879 12l-4.94 4.939z"></path>
              </svg>
            </Link>
          </div>
          <MovieList
            category={ categories.tv }
            type={ tvType.popular }
            sliceNum={ 10 }
          />
        </div>
      </section>
      <section className="movie-list section">
        <div className="container">
          <div className="movie-list__heading">
            <h3 className=" heading --h3">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="M20 6h-5.586l2.293-2.293-1.414-1.414L12 5.586 8.707 2.293 7.293 3.707 9.586 6H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zM4 19V8h16l.002 11H4z"></path>
              </svg>
              Tv Shows
            </h3>
            <Link
              to={ `/${categories.tv}/${tvType.top_rated}?page=${1}` }
            >
              View all
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M10.061 19.061 17.121 12l-7.06-7.061-2.122 2.122L12.879 12l-4.94 4.939z"></path>
              </svg>
            </Link>
          </div>
          <MovieList
            category={ categories.tv }
            type={ movieType.top_rated }
            sliceNum={ 5 }
          />
        </div>
      </section>
    </>
  );
}
