import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

let jason = require("./../data/ramos.json");

const Asignatura = () => {
  const [currentSemesterSubjects, setCurrentSemesterSubjects] = useState([]);
  const [pastSemesterSubjects, setPastSemesterSubjects] = useState([]);
  const [semester, setSemester] = useState("current");
  const [subject, setSubject] = useState("");
  const [image, setImage] = useState("");
  const [sigla, setSigla] = useState(""); // Agregado

  const addCurrentSemesterSubject = (subject, image, sigla) => {
    setCurrentSemesterSubjects([...currentSemesterSubjects, { subject, image, sigla }]);
  };

  const removeCurrentSemesterSubject = (subject) => {
    setCurrentSemesterSubjects(currentSemesterSubjects.filter((s) => s.subject !== subject));
  };

  const addPastSemesterSubject = (subject, image, sigla) => {
    setPastSemesterSubjects([...pastSemesterSubjects, { subject, image, sigla }]);
  };

  const addSubject = () => {
    if (subject && image && sigla) { // Verifica que todos los campos estén completos
      const data = { subject, image, sigla }; // Crea un objeto con los datos a enviar

      fetch("http://localhost:3001/json", { // Realiza una solicitud POST al servidor
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.success) {
            if (semester === "current") {
              addCurrentSemesterSubject(subject, image, sigla);
            } else if (semester === "past") {
              addPastSemesterSubject(subject, image, sigla);
            }
            setSubject("");
            setImage("");
            setSigla("");
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
      <h2>Todos Los Ramos</h2>
      <Container>
        <Row>
          {/* Renderiza la lista de asignaturas */}
          {jason.map(({ subject, image, sigla }) => (
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
      <Form>
        <Form.Group>
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </Form.Group>
        <Form.Group> {/* Agregado */}
          <Form.Label>Sigla</Form.Label>
          <Form.Control type="text" value={sigla} onChange={(e) => setSigla(e.target.value)} />
        </Form.Group>
        <Button onClick={addSubject}>Add Subject</Button>
      </Form>
    </div>
  );
};

export default Asignatura;
