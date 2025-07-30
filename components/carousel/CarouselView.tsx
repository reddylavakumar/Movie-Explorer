"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Star } from "lucide-react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview?: string;
  release_date?: string;
  vote_average: string;
};

const CarouselView = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className="flex justify-center items-center dark:text-white">
      <div className="w-screen max-w-7xl mx-auto rounded-xl shadow-2xl ">
        <Carousel
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
          className="w-full"
        >
          <CarouselContent>
            {movies.map((movie, idx) => (
              <CarouselItem key={idx} className="w-full">
                <div
                  className="flex flex-col bg-[#d6d4d4] md:flex-row items-center gap-6 p-6 md:p-12
                             dark:bg-gradient-to-r from-zinc-900 to-zinc-800
                             rounded-lg overflow-hidden transition-all duration-300 ease-in-out
                             transform"
                >
                  <div className="w-full md:w-1/2 flex justify-center items-center">
                    <Image
                      width={550}
                      height={550}
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full max-w-xs md:max-w-sm lg:max-w-md h-[550px] md:h-[450px]
                                 object-cover rounded-lg shadow-lg border-2 border-gray-500
                                 transition-transform duration-300 ease-in-out transform"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/500x700/333333/FFFFFF?text=No+Image`;
                        e.currentTarget.onerror = null;
                      }}
                    />
                  </div>

                  {/* Right - Details Section */}
                  <div className="w-full md:w-1/2 text-white space-y-4 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                      {movie.title}
                    </h2>
                    {movie.release_date && (
                      <p className="text-sm md:text-base text-black dark:text-zinc-300 font-medium">
                        Release Date:{" "}
                        <span className=" text-blue-600 dark:text-blue-300">
                          {movie?.release_date
                            ?.split("-")
                            ?.reverse()
                            ?.join("-")}
                        </span>
                      </p>
                    )}
                    {movie.overview && (
                      <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-6">
                        {movie.overview}
                      </p>
                    )}
                    <div className=" flex gap-2 items-center">
                      <Star
                        size={20}
                        color="#ffbb00"
                        strokeWidth={3}
                        fill="#ffbb00"
                      />
                      <span className=" text-black dark:text-white">
                        {parseFloat(movie?.vote_average).toFixed(2)}
                      </span>
                    </div>
                    <Link href={`/movie/${movie.id}`}>
                      <Button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
                        About Movie
                      </Button>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute -left-20 top-1/2 -translate-y-1/2 z-20 h-14 w-14 rounded-full dark:bg-white/20 dark:text-white hover:bg-white/30 transition-colors duration-200 flex items-center justify-center" />
          <CarouselNext className="absolute -right-20 top-1/2 -translate-y-1/2 z-20 h-14 w-14 rounded-full dark:bg-white/20 dark:text-white hover:bg-white/30 transition-colors duration-200 flex items-center justify-center" />
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselView;
