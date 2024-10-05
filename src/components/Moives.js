import { Col, Container, Form, Row, Table } from 'react-bootstrap';

const Movie = () => {
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
        <h3 className='text-center'>List of Movies</h3>
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
}

export default Movie;