import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const MiSemestre = () => {
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

  const removePastSemesterSubject = (subject) => {
    setPastSemesterSubjects(pastSemesterSubjects.filter((s) => s.subject !== subject));
  };

  const addSubject = () => {
    if (subject && image) {
      if (semester === "current") {
        addCurrentSemesterSubject(subject, image);
      } else if (semester === "past") {
        addPastSemesterSubject(subject, image);
      } else {
        alert("Invalid semester.");
      }
      setSubject("");
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
      <h2>Past Semester</h2>
      <Container>
        <Row>
          {pastSemesterSubjects.map(({ subject, image }) => (
            <Col md={4} key={subject}>
              <Link to={`/asignaturas/${subject}`}>
                <Card onClick={() => removePastSemesterSubject(subject)}>
                  <Card.Img variant="top" src={image} alt={subject} style={{ width: "360px", height: "230px" }} />
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
          <Form.Control type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Semester</Form.Label>
          <Form.Control as="select" value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option value="current">Current Semester</option>
            <option value="past">Past Semester</option>
          </Form.Control>
        </Form.Group>
        <Button onClick={addSubject}>Add Subject</Button>
      </Form>
    </div>
  );
};

export default MiSemestre;
