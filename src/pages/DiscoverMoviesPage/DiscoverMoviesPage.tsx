import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import "./DiscoverMoviesPage.css";

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

  const history = useHistory();
  const routeParams = useParams<{ searchText: string }>();

  const navigateToSearch = () => {
    const routeParam = encodeURIComponent(searchText);
    history.push(`/discover/${routeParam}`);
  };

  useEffect(() => {
    async function fetchData() {
      if (!routeParams.searchText) {
        setState({ status: "idle" });
        return;
      }

      setState({ status: "loading" });

      const apiKey = `fd525055`;
      const queryParam = encodeURIComponent(routeParams.searchText);

      const response = await axios.get(
        `https://omdbapi.com/?apikey=${apiKey}&s=${queryParam}`
      );

      setState({ status: "success", data: response.data });
    }
    fetchData();
  }, [routeParams.searchText]);

  return (
    <div>
      <h1>Discover some movies!</h1>
      <p>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {/* <button onClick={search}>Search</button> */}
        <button onClick={navigateToSearch}>Search</button>
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
                    <Link to={`/movie/${movie.imdbID}`}>
                      <p>{movie.Title}</p>
                    </Link>
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
