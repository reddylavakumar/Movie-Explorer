"use client";

import dynamic from "next/dynamic";
import Loading from "@/app/dashboard/loading";

const TrendingSection = dynamic(() => import("./LazyTrendingSection"), {
  ssr: false,
  loading: () => <Loading />,
});

const PopularSection = dynamic(() => import("./LazyPopularSection"), {
  ssr: false,
  loading: () => <Loading />,
});

type Props = {
  trending: any[];
  popular: any[];
};

export default function LazyMovieSections({ trending, popular }: Props) {
  return (
    <>
      <TrendingSection movies={trending} />
      <PopularSection movies={popular} />
    </>
  );
}
