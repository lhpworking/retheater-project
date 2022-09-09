import axios from "axios";
import queryString from "query-string";

export const movieImg = {
  originalImg: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
  w500Img: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_HOST,
  paramsSerializer: (params) =>
    queryString.stringify({
      ...params,
      api_key: import.meta.env.VITE_SOME_KEY,
    }),
});
api.interceptors.request.use(async (config) => config);

api.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);
