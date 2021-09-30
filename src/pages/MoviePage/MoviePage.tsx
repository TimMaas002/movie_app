import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MoviePage.css";

type MovieData = {
  Title: string;
  Poster: string;
  Director: string;
  Language: string;
  Plot: string;
  Genre: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
};

function MoviePage() {
  const routeParams = useParams<{ imdbID: string }>();
  const [movieData, setMovieData] = useState<MovieData>();

  useEffect(() => {
    async function fetchData() {
      const apiKey = `fd525055`;

      const response = await axios.get(
        `https://omdbapi.com/?apikey=${apiKey}&i=${routeParams.imdbID}`
      );
      setMovieData(response.data);
      console.log(response.data);
    }

    fetchData();
  }, [routeParams.imdbID]);

  return (
    <div>
      {movieData ? (
        <div className="single-movie">
          <h2 className="movie-title">{movieData.Title}</h2>
          <div className="movie-genre">
            <span>{movieData.Genre}</span>
          </div>
          <div className="movie-content">
            <div className="movie-poster">
              <img src={movieData.Poster} alt={movieData.Title} />
            </div>
            <div className="movie-director">
              <h3>Director</h3>
              <span>{movieData.Director}</span>
            </div>
            <div className="movie-language">
              <h3>Language</h3>
              <span>{movieData.Language}</span>
            </div>
            <div className="movie-plot">
              <h3>Plot</h3>
              <p>{movieData.Plot}</p>
            </div>
            <div className="movie-rating">
              <h3>IMDB Rating</h3>
              <span>{movieData.imdbRating}</span>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MoviePage;
