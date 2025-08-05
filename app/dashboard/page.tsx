import Header from "@/components/header/Header";
import MovieGrid from "@/components/moviecardandgrid/MovieGrid";
import { tmdbApi } from "@/lib/tmdb";
import CarouselView from "@/components/carousel/CarouselView";
import LazyMovieSections from "@/components/lazy/LazyMovieSections";
import TransitionWrapper from "@/lib/TransitionWrapper";
type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function Page({ searchParams }: PageProps) {
  const normalize = (param: string | string[] | undefined) =>
    Array.isArray(param) ? param[0] : param || "";

  const searchQuery = normalize(searchParams?.query);
  const searchType = normalize(searchParams?.type);

  const [trending, popular, topRated, shows] = await Promise.all([
    tmdbApi.getTrending(),
    tmdbApi.getPopular(),
    tmdbApi.getTopRated(),
    tmdbApi.shows(),
  ]);

  let movies = popular?.results;
  let searchResults = null;

  if (searchType === "series") {
    movies = shows?.results;
  } else if (searchType === "newpopular") {
    movies = topRated?.results;
  } else if (searchType === "trending") {
    movies = trending?.results;
  }

  if (searchQuery?.length > 0) {
    searchResults = await tmdbApi?.searchMovies(searchQuery);
    movies = searchResults.results;
  }

  const isFilteredView = searchType || searchQuery.length > 0;

  return (
    <div>
      <Header />
      <main className="bg-white dark:bg-[#2b1b14] min-h-screen">
        <TransitionWrapper
          triggerKey={
            isFilteredView
              ? `filtered-${searchType}-${searchQuery}`
              : "default-view"
          }
        >
          {isFilteredView ? (
            movies && movies.length > 0 ? (
              <section className="px-6 pb-16 text-white dark:bg-[#2b1b14]">
                <h2 className="text-2xl font-semibold text-black  dark:text-white mb-4 pt-5">
                  {searchType
                    ? searchType
                        .split("-")
                        .map((word) => word[0].toUpperCase() + word.slice(1))
                        .join(" ")
                    : "Search Results"}
                </h2>
                <MovieGrid movies={movies} />
              </section>
            ) : (
              <div className="flex justify-center items-center min-h-[90vh] text-white">
                <p>No movies found</p>
              </div>
            )
          ) : (
            <>
              <section className="px-6 pt-10">
                <CarouselView movies={topRated?.results || []} />
              </section>
              <LazyMovieSections
                trending={trending?.results?.slice(0, 5) || []}
                popular={popular?.results?.slice(0, 5) || []}
              />
            </>
          )}
        </TransitionWrapper>
      </main>
    </div>
  );
}
