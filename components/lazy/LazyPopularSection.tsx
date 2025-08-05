"use client";

import { useEffect, useRef, useState } from "react";
import MovieGrid from "../moviecardandgrid/MovieGrid";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";

type TrendingSectionProps = {
  movies: any[];
};

export default function TrendingSection({ movies }: TrendingSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

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
    <div ref={ref} className="px-6 mt-2 min-h-[300px]">
      {isVisible && (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-2">
                Popular
              </h2>
            </div>
            <div>
              <Button
                variant={"link"}
                onClick={() => router.push("?type=new-popular")}
              >
                Check Out More Popular Movies
                <MoveRight />
              </Button>
            </div>
          </div>

          <MovieGrid movies={movies} />
        </>
      )}
    </div>
  );
}
