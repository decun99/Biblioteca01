import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import jason from "./ramos.json";
import axios from "axios";

const Asignatura = () => {
  const [currentSemesterSubjects, setCurrentSemesterSubjects] = useState([]);
  const [pastSemesterSubjects, setPastSemesterSubjects] = useState([]);
  const [semester, setSemester] = useState("current");
  const [subject, setSubject] = useState("");
  const [image, setImage] = useState("");

  const addCurrentSemesterSubject = (subject, image) => {
    setCurrentSemesterSubjects([...currentSemesterSubjects, { subject, image }]);
  };

  const removeCurrentSemesterSubject = (subject) => {
    setCurrentSemesterSubjects(currentSemesterSubjects.filter((s) => s.subject !== subject));
  };

  const addPastSemesterSubject = (subject, image) => {
    setPastSemesterSubjects([...pastSemesterSubjects, { subject, image }]);
  };

  const addSubject = async () => {
    const updatedData = await axios.post("http://localhost:3001/json", {
      subjects: [...jason.subjects, { subject, image }],
    });
  
    if (updatedData.data.success) {
      alert("Subject added successfully.");
    } else {
      alert("Something went wrong.");
    }
  };

  return (
    <div>
      <h2>TODOS LOS PUTOS RAMO</h2>
      <Container>
        <Row>
          {jason.subjects.map(({ subject, image }) => (
            <Col md={4} key={subject}>
              <Link to={`/asignaturas/${subject}`}>
                <Card onClick={() => removeCurrentSemesterSubject(subject)}>
                  <Card.Img
                    variant="top"
                    src={image}
                    alt={subject}
                    style={{ width: "350px", height: "150px" }}
                  />
                  <Card.Body>
                    <Card.Title>{subject}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
      <Form>
        <Form.Group>
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>
        <Button onClick={addSubject}>Add Subject</Button>
      </Form>
    </div>
  );
};

export default Asignatura;