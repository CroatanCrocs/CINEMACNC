declare module 'movie-trailer' {
  function movieTrailer(movieName: string): Promise<string>;
  export = movieTrailer;
}
