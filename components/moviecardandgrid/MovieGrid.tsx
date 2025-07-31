import MovieCard from "./MovieCard";
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: string;
};
const genreMap: { [key: number]: string } = {
  28: "Action",
  12: "Adventure",
  14: "Fantasy",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};
export default function MovieGrid({ movies }: { movies: Movie[] }) {
  console.log(movies, "movies");

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 px-8 py-8 ">
      {movies.map((movie: any, idx: any) => (
        <MovieCard
          key={idx}
          title={movie?.title}
          image={movie?.poster_path}
          movie={{
            id: movie?.id,
            rating: movie?.adult ? "A" : "UA 13+",
            language: movie.original_language.toUpperCase(),
            genre: movie?.genre_ids
              .map((id: any) => genreMap[id])
              .filter(Boolean),
            isNew:
              new Date(movie.release_date) >=
              new Date(new Date().setDate(new Date().getDate() - 60)),
            // new Date(movie.release_date) > new Date(),
            vote_average: movie.vote_average,
          }}
        />
      ))}
    </div>
  );
}
