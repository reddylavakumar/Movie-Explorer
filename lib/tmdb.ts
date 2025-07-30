const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_KEY!;

const tmdbFetch = async (endpoint: string) => {
  const response = await fetch(
    `${TMDB_BASE_URL}${endpoint}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );

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
