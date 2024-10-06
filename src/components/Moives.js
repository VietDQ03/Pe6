import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";

const Movie = () => {
  const [product, setProduct] = useState([]);
  const [director, setDirector] = useState([]);
  const [star, setStar] = useState([]);
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const producerAPI = await axios.get("http://localhost:9999/producers");
        const directorAPI = await axios.get("http://localhost:9999/directors");
        const startAPI = await axios.get("http://localhost:9999/stars");
        const movieAPI = await axios.get("http://localhost:9999/movies");
        setProduct(producerAPI.data);
        const loadMovies = movieAPI.data.map((movie) => {
          const director = directorAPI.data.find(
            (dir) => dir.id === movie.director.toString()
          );
          const stars = movie.stars.map((starId) =>
            startAPI.data.find((star) => star.id === starId.toString())
          );
          
          return { ...movie, director, stars };
        });
        setMovie(loadMovies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetch();
  }, []);
  console.log("viet",movie);
  
  return (
    <>
      <Container>
        <Row className="text-center py-3">
          <h2>React Application</h2>
        </Row>

        <Row className="d-flex justify-content-center py-3">
          <Form.Control
            // onChange={handleChange}
            type="text"
            aria-label="search"
            placeholder="--Searching movie by name--"
            style={{ width: "400px" }}
          />
        </Row>
        <Row>
          <Col sm={2}>
            <h3>Producer</h3>
            <ul>
              {/* {product.map((data) => (
              <li>
                <div>
                  <Link to={"/movie?producer-id=" + data.id}>
                    {data.Name}
                  </Link>
                </div>
              </li>
            ))} */}
            </ul>
          </Col>
          <Col sm={10}>
            <h3 className="text-center">List of Movies</h3>
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
                {/* {movies.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.id}</td>
                  <td>{movie.Title}</td>
                  <td>{movie.ReleaseDate}</td>
                  <td>{movie.Description}</td>
                  <td>{movie.Language}</td>
                  <td>{movie.director.FullName}</td>
                  <td>
                    {movie.stars.map((star) => (
                      <div>{star.FullName}</div> // Each star in its own line
                    ))}
                  </td>
                </tr>
              ))} */}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Movie;
