import { api } from "../constants/api";
import { categories, movieType, times, tvType } from "../constants/tmdb";

export const movieServices = {
  getTrending(category, time) {
    const url = "trending/" + categories[category] + "/" + times[time];
    return api.get(url, { params: {} });
  },
  getMovies: (type, params) => {
    const url = "movie/" + movieType[type];
    return api.get(url, params);
  },
  getTVShows: (type, params) => {
    const url = "tv/" + tvType[type];
    return api.get(url, params);
  },
  getVideos: (category, id) => {
    const url = categories[category] + "/" + id + "/videos";
    return api.get(url, { params: {} });
  },
  getPeople: (id) => {
    const url = "/person/" + id;
    return api.get(url, { params: {} });
  },
  getSearch: (category, params) => {
    const url = "search/" + categories[category];
  },
  getDetails: (category, id) => {
    const url = categories[category] + "/" + id;
    return api.get(url, { params: {} });
  },
  getCredits: (category, id) => {
    const url = categories[category] + "/" + id + "/credits";
    return api.get(url, { params: {} });
  },
  getSimilar: (category, id) => {
    const url = categories[category] + "/" + id + "/similar";
    return api.get(url, { params: {} });
  },
};
