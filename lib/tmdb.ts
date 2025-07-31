const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_KEY!;
import { useQuery } from "@tanstack/react-query";

const tmdbFetch = async (endpoint: string) => {
  const joiner = endpoint.includes("?") ? "&" : "?";
  const url = `${TMDB_BASE_URL}${endpoint}${joiner}api_key=${TMDB_ACCESS_TOKEN}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }
  return response.json();
};

export const tmdbApi = {
  getTrending: () => tmdbFetch("/trending/movie/week"),
  getPopular: () => tmdbFetch("/movie/popular"),
  getTopRated: () => tmdbFetch("/movie/top_rated"),
  searchMovies: (query: string) =>
    tmdbFetch(`/search/movie?query=${encodeURIComponent(query)}`),
};

export const useTrendingMovies = () => {
  return useQuery({
    queryKey: ["trending"],
    queryFn: tmdbApi.getTrending,
  });
};

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ["popular"],
    queryFn: tmdbApi.getPopular,
  });
};

export const useTopRatedMovies = () => {
  return useQuery({
    queryKey: ["topRated"],
    queryFn: tmdbApi.getTopRated,
  });
};
