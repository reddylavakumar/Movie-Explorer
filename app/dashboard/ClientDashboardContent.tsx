"use client";
import dynamic from "next/dynamic";
import Loading from "./loading";
const DynamicCarouselView = dynamic(
  () => import("@/components/carousel/CarouselView"),
  {
    ssr: false,
    loading: () => (
      <>
        <div className="text-center min-h-[500px] flex flex-col justify-center items-center ">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 dark:border-orange-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading the Carousel view...
          </p>
        </div>
      </>
    ),
  }
);

interface ClientDashboardContentProps {
  movies: any;
}

export default function ClientDashboardContent({
  movies,
}: ClientDashboardContentProps) {
  return (
    <div className="mt-4">
      {movies ? <DynamicCarouselView movies={movies} /> : <Loading />}
    </div>
  );
}
