import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Container, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";

let jason = require("./../data/ramos.json");

const MiSemestre = () => {
  const [currentSemesterSubjects, setCurrentSemesterSubjects] = useState([]);
  const [semester, setSemester] = useState("current");
  const [image, setImage] = useState("");
  const [subject, setSelectedSubject] = useState("");


  const addCurrentSemesterSubject = (subject, image) => {
    setCurrentSemesterSubjects([...currentSemesterSubjects, { subject, image }]);
  };

  const removeCurrentSemesterSubject = (subject) => {
    setCurrentSemesterSubjects(currentSemesterSubjects.filter((s) => s.subject !== subject));
  };

  const addSubject = () => {
    if (subject && image) {
      if (semester === "current") {
        addCurrentSemesterSubject(subject, image);
      } else {
        alert("Invalid semester.");
      }
      setSelectedSubject("");
      setImage("");
    }
  };

  return (
    <div>
      <h2>Current Semester</h2>
      <Container>
        <Row>
          {currentSemesterSubjects.map(({ subject, image }) => (
            <Col md={4} key={subject}>
              <Link to={`/asignaturas/${subject}`}>
                <Card onClick={() => removeCurrentSemesterSubject(subject)}>
                  <Card.Img variant="top" src={image} alt={subject} style={{ width: "350px", height: "180px" }} />
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
          <DropdownButton id="subject-dropdown" title={subject || "Select Subject"}>
            {jason.map(({ sigla }) => (
              <Dropdown.Item key={sigla} onClick={() => setSelectedSubject(sigla)}>
                {sigla}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Form.Group>

        <Form.Group>
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </Form.Group>
        <Button onClick={addSubject}>Add Subject</Button>
      </Form>
    </div>
  );
};

export default MiSemestre;
