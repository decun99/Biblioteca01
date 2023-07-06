import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Container, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";

let jason = require("./../data/ramos.json");
let misem = require("./../data/ramosMiSemestreMock.json")

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
    if (subject) { 
      const foundEntry = jason.find(entry => entry.subject === subject);
      if(!image){
        setImage("data:image/jpeg;base64,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");
      }

      fetch("http://localhost:3001/jsonmisem", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(foundEntry)
      })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          if (semester === "current") {
            addCurrentSemesterSubject(foundEntry);
          }
          setSelectedSubject("");
          setImage("");
        } else {
          console.error("Error al guardar los datos en el servidor");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
    }
  };

  return (
    <div>
      <h2>Current Semester</h2>
      <Container>
        <Row>
          {/* Renderiza la lista de asignaturas */}
          {misem.map(({ subject, image, sigla }) => (
            <Col md={4} key={subject}>
              <Link to={`/asignaturas/${subject}`}>
                <Card onClick={() => removeCurrentSemesterSubject(subject)}>
                  <Card.Img variant="top" src={image} alt={subject} style={{ width: "350px", height: "150px" }} />
                  <Card.Body>
                    <Card.Title>{subject}</Card.Title>
                    <Card.Subtitle>{sigla}</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
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
            {jason.map(({ subject }) => (
              <Dropdown.Item key={subject} onClick={() => setSelectedSubject(subject)}>
                {subject}
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
