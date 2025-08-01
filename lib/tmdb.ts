// const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
// const TMDB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_KEY!;
// import { useQuery } from "@tanstack/react-query";

// const tmdbFetch = async (endpoint: string) => {
//   const joiner = endpoint.includes("?") ? "&" : "?";
//   const url = `${TMDB_BASE_URL}${endpoint}${joiner}api_key=${TMDB_ACCESS_TOKEN}`;

//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(`TMDB API error: ${response.status}`);
//   }
//   return response.json();
// };

// export const tmdbApi = {
//   getTrending: () => tmdbFetch("/trending/movie/week"),
//   getPopular: () => tmdbFetch("/movie/popular"),
//   getTopRated: () => tmdbFetch("/movie/top_rated"),
//   searchMovies: (query: string) =>
//     tmdbFetch(`/search/movie?query=${encodeURIComponent(query)}`),
//   shows: () => tmdbFetch("/tv/popular"),
// };

// export const useTrendingMovies = () => {
//   return useQuery({
//     queryKey: ["trending"],
//     queryFn: tmdbApi.getTrending,
//   });
// };

// export const usePopularMovies = () => {
//   return useQuery({
//     queryKey: ["popular"],
//     queryFn: tmdbApi.getPopular,
//   });
// };

// export const useTopRatedMovies = () => {
//   return useQuery({
//     queryKey: ["topRated"],
//     queryFn: tmdbApi.getTopRated,
//   });
// };

import axios from "axios";
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!TMDB_BASE_URL || !TMDB_API_KEY) {
  throw new Error("Missing TMDB API environment variables");
}

const axiosClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

const tmdbFetch = async (endpoint: string, extraParams = {}) => {
  try {
    const response = await axiosClient.get(endpoint, {
      params: extraParams,
    });
    return response.data;
  } catch (error: any) {
    console.error("TMDB API Error:", error.response?.data || error.message);
    throw new Error(
      `TMDB API error: ${error.response?.status || 500} - ${error.message}`
    );
  }
};

export const tmdbApi = {
  getTrending: () => tmdbFetch("/trending/movie/week"),
  getPopular: () => tmdbFetch("/movie/popular"),
  getTopRated: () => tmdbFetch("/movie/top_rated"),
  searchMovies: (query: string) =>
    tmdbFetch("/search/movie", { query: encodeURIComponent(query) }),
  shows: () => tmdbFetch("/tv/popular"),
};
