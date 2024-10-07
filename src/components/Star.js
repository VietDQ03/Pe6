import axios from "axios";
import { Alert } from "bootstrap";
import { useEffect, useState } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Star = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null); // Khởi tạo `movie` là null
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [formData, setformData] = useState({
    stars: [],
  });
  const navigate = useNavigate();

  const [stars, setStars] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieAPI = await axios.get(`http://localhost:9999/movies/${id}`);
        setMovie(movieAPI.data);
        const starAPI = await axios.get("http://localhost:9999/stars");
        setStars(starAPI.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id, formData]);
  const handleCheckboxChange = (event, star) => {
    const isChecked = event.target.checked;
    setformData((prevFormData) => {
      const newStars = isChecked
        ? [...prevFormData.stars, star.id]
        : prevFormData.stars.filter((s) => s !== star.id);

      return { ...prevFormData, stars: newStars };
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    try {
      await addDataToServer(formData);

      setSuccessMessage("Stars added successfully!");
      alert(successMessage);
      navigate(`/movie`);
    } catch (error) {
      console.error("Error adding stars:", error);
    }
  };
  const addDataToServer = async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:9999/movies/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error adding data:", error);
      throw error;
    }
  };

  if (loading) {
    return <p>Loading movie...</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }
  return (
    <Container>
      <h1 className="text-center" style={{ margin: "20px" }}>
        Add stars to the movie
      </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Movie title</Form.Label>
          <Form.Control type="text" placeholder={movie.title} disabled />
        </Form.Group>
        <Form.Label>Stars</Form.Label>
        <Row>
          <Col>
            <div
              className="d-flex flex-wrap"
              style={{ gap: "10px", marginTop: "20px", marginBottom: "20px" }}
            >
              {" "}
              {stars.map((star) => (
                <div key={star.id} className="form-check me-3">
                  {" "}
                  <Form.Check
                    type="checkbox"
                    id={star.id}
                    label={star.fullname}
                    onChange={(e) => handleCheckboxChange(e, star)}
                  />
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <Button variant="success" type="submit">
          Add Stars
        </Button>{" "}
      </Form>
    </Container>
  );
};

export default Star;
