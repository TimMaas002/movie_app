import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

function NavBar() {
  return (
    <div>
      <NavLink
        activeStyle={{ fontWeight: "bold" }}
        className="App-link"
        to="/"
        exact
      >
        Home
      </NavLink>
      <NavLink
        activeStyle={{ fontWeight: "bold" }}
        className="App-link"
        to="/about"
      >
        About
      </NavLink>
      <NavLink
        activeStyle={{ fontWeight: "bold" }}
        className="App-link"
        to="/discover-movies"
      >
        Discover Movies
      </NavLink>
    </div>
  );
}

export default NavBar;
