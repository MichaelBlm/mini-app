import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useRef } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const inputRef = useRef();

  const fetchMovies = () => {
    return fetch("http://localhost:8080/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => console.error);
  };

  const filtedMovies = movies?.filter(({ title }) => {
    return title?.toLowerCase().includes(query?.toLowerCase());
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    const value = inputRef.current.value;
    console.log(value);
    fetch("http://localhost:8080/movies", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: value,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    }).then(() => fetchMovies());

    inputRef.current.value = "";
  }

  return (
    <>
      Search:
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="search"
      />
      <br />
      <br />
      <form onSubmit={onSubmit}>
        New Item: <input ref={inputRef} type="text" />
        <button type="submit">Add</button>
      </form>
      <h3>Movies:</h3>
      {filtedMovies?.map(({ title, id }) => (
        <div key={id}>{title}</div>
      ))}
    </>
  );
}

export default App;
