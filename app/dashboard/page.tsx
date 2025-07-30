import CarouselView from "@/components/carousel/CarouselView";
import Header from "@/components/header/Header";
import MovieGrid from "@/components/moviecardandgrid/MovieGrid";
import { Spinner } from "@/components/spinner/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tmdbApi } from "@/lib/tmdb";
import { CircleX, SearchIcon } from "lucide-react";

const [trending, popular, topRated] = await Promise.all([
  tmdbApi.getTrending(),
  tmdbApi.getPopular(),
  tmdbApi.getTopRated(),
]);

export default async function Dashboard() {
  const movies = popular.results;
  console.log(movies, "movies 1");

  return (
    <div>
      <Header />
      {movies ? (
        <main className=" bg-white dark:bg-[#2b1b14] min-h-screen">
          <div className="px-6 pt-6">
            {/* ----search bar---- */}
            {/* <div className="relative hidden md:block w-full max-w-md mb-6">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 pr-10 bg-[#3a2a21] border-none text-white placeholder:text-gray-400 "
              placeholder="Search"
            />
            <CircleX className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-500 transition ease-in" />
          </div> */}

            {/* <div className="flex gap-4 flex-wrap mb-6">
            {[
              "All",
              "Movies",
              "Series",
              // "People",
              // "Genres",
              // "Release Year",
            ].map((label) => (
              <Button
                key={label}
                className="bg-[#3a2a21] px-4 py-2 rounded-full text-sm"
              >
                {label}
              </Button>
            ))}
          </div> */}
          </div>
          <div className="mt-4">
            <CarouselView movies={movies} />
          </div>
          <section className="px-6 pb-16 text-white mt-10">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              Popular Movies
            </h2>
            <MovieGrid movies={movies} />
          </section>
        </main>
      ) : (
        <main className="bg-[#2b1b14] min-h-screen flex justify-center items-center">
          <Spinner size="small" className="text-white" />
        </main>
      )}
    </div>
  );
}
