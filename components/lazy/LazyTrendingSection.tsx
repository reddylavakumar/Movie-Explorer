"use client";

import { useEffect, useRef, useState } from "react";
import MovieGrid from "../moviecardandgrid/MovieGrid";

type TrendingSectionProps = {
  movies: any[];
};

export default function TrendingSection({ movies }: TrendingSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="px-6 mt-6 min-h-[300px]">
      {isVisible && (
        <>
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
            Trending
          </h2>
          <MovieGrid movies={movies} />
        </>
      )}
    </div>
  );
}
