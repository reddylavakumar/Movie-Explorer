import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type MovieCardProps = {
  title: string;
  image: string | null;
  movie: {
    id: string | number;
    rating: string;
    language: string;
    genre: string[];
    isNew?: boolean;
    vote_average: string;
  };
};

export default function MovieCard({ title, image, movie }: MovieCardProps) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group w-full max-w-xs sm:max-w-sm bg-background dark:bg-black border border-border rounded-xl overflow-hidden shadow-md transition hover:shadow-lg"
    >
      <div className="relative">
        {/* New Release Badge */}
        {movie.isNew && (
          <div className="absolute top-2 left-2 z-10 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
            New Release
          </div>
        )}

        {/* Movie Poster */}
        {image ? (
          <Image
            width={250}
            height={350}
            src={`https://image.tmdb.org/t/p/w500${image}`}
            alt={title}
            className="w-full h-[350px] object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
        ) : (
          <div
            className="w-full h-[350px] bg-gray-800 flex items-center justify-center text-white text-sm 
          
          "
          >
            {/* animate-pulse */}
            No image available
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <p
          className="text-lg font-semibold text-foreground leading-tight line-clamp-2"
          title={title}
        >
          {title?.length > 32 ? `${title.slice(0, 31)}...` : title}
        </p>

        <p className="text-sm text-muted-foreground mt-1">
          {movie.rating} &bull; {movie.language}
        </p>

        {/* Genre Tags */}
        <div className="mt-2 flex flex-wrap gap-2 text-xs font-medium items-center">
          {movie.genre.slice(0, 2).map((g, idx) => (
            <span
              key={idx}
              className="bg-muted text-foreground px-2 py-0.5 rounded-full border border-border"
            >
              {g}
            </span>
          ))}

          {movie.genre.length > 2 && (
            <span className="text-muted-foreground">
              +{movie.genre.length - 2} more
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <Star size={20} color="#ffbb00" strokeWidth={3} fill="#ffbb00" />
          <span className="text-foreground">
            {parseFloat(movie.vote_average).toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
}
