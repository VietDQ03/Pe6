import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Movie = () => {
  const [product, setProduct] = useState([]);
  const [genres, setGenres] = useState([]);
  const [movie, setMovie] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const [producerAPI, directorAPI, startAPI, movieAPI] =
          await Promise.all([
            axios.get("http://localhost:9999/producers"),
            axios.get("http://localhost:9999/directors"),
            axios.get("http://localhost:9999/stars"),
            axios.get("http://localhost:9999/movies"),
          ]);
        setProduct(producerAPI.data);
        const loadMovies = movieAPI.data.map((movie) => {
          const director = directorAPI.data.find(
            (dir) => dir.id === movie.director.toString()
          );
          const producer = producerAPI.data.find(
            (producer) => producer.id === movie.producer.toString()
          );
          const stars = movie.stars.map((starId) =>
            startAPI.data.find((star) => star.id === starId.toString())
          );

          return { ...movie, director, producer, stars };
        });
        const loadGenres = [
          ...new Set(movieAPI.data.flatMap((movie) => movie.genres)),
        ];

        setGenres(loadGenres);

        setMovie(loadMovies);
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("producer-id");
        const nameParam = urlParams.get("genre");
        if (nameParam != null) {
          const filteredMoviesByGenre = loadMovies.filter((movie) =>
            movie.genres.includes(nameParam)
          );
          setMovie(filteredMoviesByGenre);
        }
        if (idParam !== null) {
          const filteredMoviesByProducerId = loadMovies.filter(
            (movie) => movie.producer.id === idParam
          );
          console.log(filteredMoviesByProducerId);
          
          setMovie(filteredMoviesByProducerId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetch();
  }, [location]);
  console.log(movie);

  return (
    <>
      <Container>
        <Row className="text-center py-3">
          <h2>React Application</h2>
        </Row>

        <Row className="d-flex justify-content-center py-3">
          <nav>
            <hr style={{ color: "green" }} />

            <ul className="d-flex list-unstyled justify-content-center">
              {genres.map((data) => (
                <li className="mx-3" key={data}>
                  <div>
                    <Link to={"/movie/?genre=" + data}>
                      {data.toUpperCase()}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <hr style={{ color: "green" }} />
          </nav>
        </Row>
        <Row>
          <Col sm={2}>
            <h3>Producer</h3>
            <ul>
              {product.map((data) => (
                <li key={data.id}>
                  <div>
                    <Link to={"/movie/?producer-id=" + data.id}>
                      {data.name}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </Col>
          <Col sm={10}>
            <h3 className="text-center">List of Movies</h3>
            <Link to={"/movie"}>Show all movies</Link>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Release</th>
                  <th>Description</th>
                  <th>Producer</th>
                  <th>Director</th>
                  <th>Genres</th>
                  <th>Stars</th>
                </tr>
              </thead>
              <tbody>
                {movie.map((movie) => (
                  <tr key={movie.id}>
                    <td>{movie.id}</td>
                    <td>{movie.title}</td>
                    <td>
                      {new Date(movie.release).toLocaleDateString("vi-VN")}
                    </td>
                    <td>{movie.description}</td>
                    <td>{movie.producer.name}</td>
                    <td>{movie.director.fullname}</td>
                    <td>{movie.genres.join(", ")}</td>
                    <td style={{ whiteSpace: "nowrap", width: "200px" }}>
                      {movie.stars.map((star, index) => (
                        <div key={star.id}>
                          {`${index + 1} - ${star.fullname}`} <br />
                        </div>
                      ))}
                      <Button
                        variant="link"
                        onClick={() => navigate(`/movie/${movie.id}/add-stars`)}
                      >
                        Add Stars
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Movie;
