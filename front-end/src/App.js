import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { Table, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [movies, setMovies] = useState([]);
  const searchTerm = useRef();
  const movieToAdd = useRef();

  useEffect(() => {
    fetch("http://localhost:8080/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => console.error);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchTerm.current.value);
    setMovies(
      movies.filter((movie) =>
        movie.title
          .toLowerCase()
          .includes(searchTerm.current.value.toLowerCase())
      )
    );
  };

  const addMovie = (event) => {
    fetch("http://localhost:8080/movies", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: movieToAdd.current.value }),
    });
  };

  return (
    <div className="m-2">
      <Table
        className="w-75 mt-2"
        striped={true}
        bordered={true}
        hover={true}
        size="sm"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Movie Title</th>
          </tr>
        </thead>
        <tbody>
          {movies?.map(({ id: id, title: title }) => {
            return (
              <tr>
                <td>{id}</td>
                <td>{title}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div>
        <Form onSubmit={handleSearch}>
          <Form.Group className="mb-3 w-25">
            <Form.Control
              ref={searchTerm}
              type="text"
              placeholder="Search"
            ></Form.Control>
          </Form.Group>
        </Form>
        <Form onSubmit={addMovie}>
          <Form.Group className="w-50">
            <Form.Control
              ref={movieToAdd}
              type="text"
              placeholder="Movie Name"
            ></Form.Control>
            <Button className="mt-2" type="submit">
              Add
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default App;
