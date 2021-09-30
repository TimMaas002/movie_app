import React, { useState } from "react";
import axios from "axios";
import "./DiscoverMoviesPage.css";
// import MovieItem from "../components/MovieItem";

type Movie = {
  Title: string;
  Poster: string;
  Type: string;
  Year: string;
  imdbID: string;
};

type ApiResult = {
  Response: "true";
  Search: Movie[];
  totalResults: string;
};

type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: ApiResult }
  | { status: "error"; error: any };

function DiscoverMoviesPage() {
  const [searchText, setSearchText] = useState("");
  const [state, setState] = useState<SearchState>({ status: "idle" });

  const search = async () => {
    console.log("Start searching for:", searchText);
    setState({ status: "loading" });

    const queryParam = encodeURIComponent(searchText);

    const apiKey = `fd525055`;

    const response = await axios.get(
      `https://omdbapi.com/?apikey=${apiKey}&s=${queryParam}`
    );

    setState({ status: "success", data: response.data });

    console.log("Success!", response);
  };
  return (
    <div>
      <h1>Discover some movies!</h1>
      <p>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </p>
      {state.status === "loading" && <p>Searching...</p>}
      {state.status === "success" && (
        <div className="movies">
          <h2>Search results</h2>
          <ul className="movie-list">
            {state.data.Search.slice(0, 10).map((movie) => {
              return (
                <li className="movie-item" key={movie.imdbID}>
                  <div>
                    <p>{movie.Title}</p>
                  </div>
                  <span>({movie.Year})</span>
                  <img src={movie.Poster} alt={movie.Title} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DiscoverMoviesPage;
