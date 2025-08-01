import Header from "@/components/header/Header";
import MovieGrid from "@/components/moviecardandgrid/MovieGrid";
import { Button } from "@/components/ui/button";
import TransitionWrapper from "@/lib/TransitionWrapper";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MovieDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const movieId = params?.slug;
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  if (!API_KEY) {
    console.error("TMDB API Key is not defined in environment variables.");
    return (
      <div>
        Error: TMDB API Key is missing. Please configure your .env.local file.
      </div>
    );
  }

  const [
    movieInfoRes,
    movieCastRes,
    similarMoviesRes,
    recommendationMoviesRes,
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } }
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } }
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } }
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } }
    ),
  ]);

  if (!movieInfoRes.ok) {
    if (movieInfoRes.status === 404) {
      notFound();
    }
    console.error(
      `Failed to fetch movie info: ${movieInfoRes.status} ${movieInfoRes.statusText}`
    );
    return <div>Error loading movie details. Please try again.</div>;
  }

  const movieInfo = await movieInfoRes.json();
  const movieCast = await movieCastRes.json();
  const similarMovies = await similarMoviesRes.json();
  const recommendationMovies = await recommendationMoviesRes.json();

  // ------- image url for tmdb poster image----------
  const getImageUrl = (
    path: string | null | undefined,
    size = "w500"
  ): string =>
    path
      ? `https://image.tmdb.org/t/p/${size}${path}`
      : "/placeholder-image.jpg";

  const releaseYear = movieInfo.release_date
    ? new Date(movieInfo.release_date).getFullYear()
    : "N/A";
  const runtime = movieInfo.runtime
    ? `${Math.floor(movieInfo.runtime / 60)}h ${movieInfo.runtime % 60}m`
    : "N/A";
  const tagline = movieInfo.tagline || "";

  const similarMoviesForGrid = similarMovies?.results?.slice(0, 5) || [];
  const recommendationMoviesForGrid =
    recommendationMovies.results.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-white dark:bg-[#2b1b14] text-white">
      <Header />
      <TransitionWrapper triggerKey="default-view">
        <section className="px-6 py-8">
          <Image
            src={getImageUrl(
              movieInfo.backdrop_path || movieInfo.poster_path,
              "original"
            )}
            alt={movieInfo?.title || "Movie Backdrop"}
            width={1200}
            height={500}
            className="rounded-lg object-cover w-full h-[300px] md:h-[545px]"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />

          <h1 className="mt-6 text-2xl md:text-3xl font-semibold text-black dark:text-white">
            {movieInfo.title}
          </h1>
          {tagline && (
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-2 italic">
              {tagline}
            </p>
          )}
          {/* <p className="text-sm text-gray-400 mt-1">2023 • PG-13 • 2h 15m</p> */}
          <p className="text-md text-[#b89881] mt-5">
            {releaseYear} •{" "}
            {movieInfo.vote_average
              ? `${movieInfo.vote_average.toFixed(1)}/10`
              : "N/A"}{" "}
            • {runtime}
          </p>

          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            {movieInfo.overview}
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <Button className="bg-orange-500 hover:bg-orange-600">Play</Button>
            <Link href={"/"}>
              <Button
                variant="secondary"
                className="text-black dark:border-white border border-gray-500 dark:text-white "
              >
                Add to My List
              </Button>
            </Link>
          </div>
        </section>
      </TransitionWrapper>
      <TransitionWrapper triggerKey="default-view">
        {movieCast?.cast && movieCast.cast.length > 0 && (
          <section className="px-6 mt-6">
            <h2 className="text-2xl font-semibold mb-8 text-black dark:text-white">
              Cast
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {movieCast.cast.slice(0, 10).map((person: any) => (
                <div key={person.id} className="text-center flex-shrink-0 w-30">
                  <div className="mx-auto mb-2 w-30 h-30 rounded-full overflow-hidden flex items-center justify-center bg-gray-700 border-2 border-gray-500 p-0">
                    <Image
                      src={
                        person.profile_path
                          ? getImageUrl(person.profile_path, "w185")
                          : "/profile.png"
                      }
                      alt={person.name}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-sm truncate text-black dark:text-white">
                    {person.name}
                  </p>
                  <p className="text-xs text-gray-400  truncate">
                    {person.character}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </TransitionWrapper>
      <TransitionWrapper triggerKey="default-view">
        {similarMovies?.results && similarMovies.results.length > 0 && (
          <section className="px-6 mt-10 pb-5">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              More Like This
            </h2>
            <MovieGrid movies={similarMoviesForGrid} />
          </section>
        )}
      </TransitionWrapper>
      <TransitionWrapper triggerKey="default-view">
        {recommendationMovies?.results &&
          recommendationMovies?.results?.length > 0 && (
            <section className="px-6 pb-16">
              <h2 className="text-2xl font-semibold text-black dark:text-white">
                Recommendations
              </h2>
              <MovieGrid movies={recommendationMoviesForGrid} />
            </section>
          )}
      </TransitionWrapper>
    </div>
  );
}
