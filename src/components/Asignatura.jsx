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
  const [sigla, setSigla] = useState("");
  const [selectedSemester, setSelectedSemester] = useState(1); // Controla el semestre mostrado en la grilla
  const [inputSemester, setInputSemester] = useState(1); // Controla el semestre al que se agregará la nueva materia

  const addCurrentSemesterSubject = (subject, image, sigla, semestre) => {
    setCurrentSemesterSubjects([...currentSemesterSubjects, { subject, image, sigla, semestre }]);
  };

  const removeCurrentSemesterSubject = (subject) => {
    setCurrentSemesterSubjects(currentSemesterSubjects.filter((s) => s.subject !== subject));
  };

  const addPastSemesterSubject = (subject, image, sigla, semestre) => {
    setPastSemesterSubjects([...pastSemesterSubjects, { subject, sigla, semestre }]);
  };

  const addSubject = () => {
    if (subject && image && sigla && inputSemester) { 
      const data = { subject, image, sigla, "semestre": inputSemester }; 

      fetch("http://localhost:3001/json", { 
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
            addCurrentSemesterSubject(subject, image, sigla, inputSemester);
          } else if (semester === "past") {
            addPastSemesterSubject(subject, image, sigla, inputSemester);
          }
          setSubject("");
          setImage("");
          setSigla("");
          setInputSemester(1);
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
      <h2>Ramos x semestre</h2>
      <Container>
      <Form.Control as="select" value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
            <option value={12}>12</option>
          </Form.Control>
        <Row>
          {jason.filter(({ semestre }) => semestre === selectedSemester).map(({ subject, image, sigla }) => (
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
        <Form.Group>
          <Form.Label>Sigla</Form.Label>
          <Form.Control type="text" value={sigla} onChange={(e) => setSigla(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Semestre</Form.Label>
          <Form.Control type="text" value={inputSemester} onChange={(e) => setInputSemester(e.target.value)} /> {/* Modificado: Utilizar `inputSemester` en lugar de `selectedSemester` */}
        </Form.Group>

        <Button onClick={addSubject}>Add Subject</Button>
      </Form>
    </div>
  );
};

export default Asignatura;