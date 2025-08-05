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
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 px-8 py-8 ">
      {movies.map((movie: any, idx: any) => (
        <MovieCard
          key={idx}
          title={movie?.title ?? movie.name}
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

// ----------------List-------------
// "use client";
// import { FixedSizeList as List } from "react-window";
// import MovieCard from "./MovieCard";

// type Movie = {
//   id: number;
//   title: string;
//   name?: string;
//   poster_path: string;
//   vote_average: string;
//   adult: boolean;
//   original_language: string;
//   genre_ids: number[];
//   release_date: string;
// };

// const genreMap: { [key: number]: string } = {
//   28: "Action",
//   12: "Adventure",
//   14: "Fantasy",
//   16: "Animation",
//   35: "Comedy",
//   80: "Crime",
//   99: "Documentary",
//   18: "Drama",
//   10751: "Family",
//   36: "History",
//   27: "Horror",
//   10402: "Music",
//   9648: "Mystery",
//   10749: "Romance",
//   878: "Science Fiction",
//   10770: "TV Movie",
//   53: "Thriller",
//   10752: "War",
//   37: "Western",
// };

// const MovieCardWrapper = ({ index, style, data }: any) => {
//   const movie = data[index];

//   return (
//     <div style={style}>
//       <MovieCard
//         title={movie?.title ?? movie.name}
//         image={movie?.poster_path}
//         movie={{
//           id: movie?.id,
//           rating: movie?.adult ? "A" : "UA 13+",
//           language: movie.original_language.toUpperCase(),
//           genre: movie?.genre_ids
//             .map((id: number) => genreMap[id])
//             .filter(Boolean),
//           isNew:
//             new Date(movie.release_date) >=
//             new Date(new Date().setDate(new Date().getDate() - 60)),
//           vote_average: movie.vote_average,
//         }}
//       />
//     </div>
//   );
// };

// export default function MovieGrid({ movies }: { movies: Movie[] }) {
//   if (movies.length > 5) {
//     return (
//       <div className="px-8 py-8">
//         <List
//           height={600}
//           itemCount={movies.length}
//           itemSize={400}
//           width="100%"
//           itemData={movies}
//         >
//           {MovieCardWrapper}
//         </List>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 px-8 py-8 ">
//       {movies.map((movie: any, idx: any) => (
//         <MovieCard
//           key={idx}
//           title={movie?.title ?? movie.name}
//           image={movie?.poster_path}
//           movie={{
//             id: movie?.id,
//             rating: movie?.adult ? "A" : "UA 13+",
//             language: movie.original_language.toUpperCase(),
//             genre: movie?.genre_ids
//               .map((id: any) => genreMap[id])
//               .filter(Boolean),
//             isNew:
//               new Date(movie.release_date) >=
//               new Date(new Date().setDate(new Date().getDate() - 60)),
//             vote_average: movie.vote_average,
//           }}
//         />
//       ))}
//     </div>
//   );
// }

// ---------------------grid------------------------

// "use client";
// import MovieCard from "./MovieCard";
// import { FixedSizeGrid as Grid } from "react-window";
// import { useMemo } from "react";
// import AutoSizer from "react-virtualized-auto-sizer";

// type Movie = {
//   id: number;
//   title: string;
//   poster_path: string;
//   vote_average: string;
//   genre_ids: number[];
//   adult: boolean;
//   original_language: string;
//   release_date: string;
//   name?: string;
// };

// const genreMap: { [key: number]: string } = {
//   28: "Action",
//   12: "Adventure",
//   14: "Fantasy",
//   16: "Animation",
//   35: "Comedy",
//   80: "Crime",
//   99: "Documentary",
//   18: "Drama",
//   10751: "Family",
//   36: "History",
//   27: "Horror",
//   10402: "Music",
//   9648: "Mystery",
//   10749: "Romance",
//   878: "Science Fiction",
//   10770: "TV Movie",
//   53: "Thriller",
//   10752: "War",
//   37: "Western",
// };

// export default function MovieGrid({ movies }: { movies: Movie[] }) {
//   const columnCount = useMemo(() => {
//     if (typeof window === "undefined") return 2;
//     const width = window.innerWidth;
//     if (width >= 1024) return 5;
//     if (width >= 768) return 4;
//     if (width >= 640) return 3;
//     return 2;
//   }, []);

//   const Cell = ({ columnIndex, rowIndex, style, data }: any) => {
//     const index = rowIndex * columnCount + columnIndex;
//     if (index >= data.length) return null;
//     const movie = data[index];

//     return (
//       <div style={style} className="px-2 py-4 m-4">
//         <MovieCard
//           key={movie.id}
//           title={movie?.title ?? movie.name}
//           image={movie?.poster_path}
//           movie={{
//             id: movie?.id,
//             rating: movie?.adult ? "A" : "UA 13+",
//             language: movie.original_language.toUpperCase(),
//             genre: movie?.genre_ids
//               .map((id: any) => genreMap[id])
//               .filter(Boolean),
//             isNew:
//               new Date(movie.release_date) >=
//               new Date(new Date().setDate(new Date().getDate() - 60)),
//             vote_average: movie.vote_average,
//           }}
//         />
//       </div>
//     );
//   };

//   if (movies.length <= 5) {
//     return (
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 px-8 py-8">
//         {movies.map((movie, idx) => (
//           <MovieCard
//             key={idx}
//             title={movie?.title ?? movie.name}
//             image={movie?.poster_path}
//             movie={{
//               id: movie?.id,
//               rating: movie?.adult ? "A" : "UA 13+",
//               language: movie.original_language.toUpperCase(),
//               genre: movie?.genre_ids
//                 .map((id: any) => genreMap[id])
//                 .filter(Boolean),
//               isNew:
//                 new Date(movie.release_date) >=
//                 new Date(new Date().setDate(new Date().getDate() - 60)),
//               vote_average: movie.vote_average,
//             }}
//           />
//         ))}
//       </div>
//     );
//   }

//   const rowCount = Math.ceil(movies.length / columnCount);
//   const ITEM_HEIGHT = 360;
//   const ITEM_WIDTH = 200;

//   return (
//     <div className="px-8 py-8">
//       <AutoSizer disableHeight>
//         {({ width }) => (
//           <Grid
//             columnCount={columnCount}
//             columnWidth={ITEM_WIDTH}
//             height={ITEM_HEIGHT * 2}
//             rowCount={rowCount}
//             rowHeight={ITEM_HEIGHT * 1.5}
//             width={width - 64}
//             itemData={movies}
//           >
//             {Cell}
//           </Grid>
//         )}
//       </AutoSizer>
//     </div>
//   );
// }
