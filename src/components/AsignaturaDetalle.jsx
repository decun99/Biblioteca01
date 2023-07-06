import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import YouTube from "react-youtube";
import rdata from "../data/ramos.json";

const AsignaturaDetalle = ({ asignatura }) => {
  const [videoId, setVideoId] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [desiredGrade, setDesiredGrade] = useState("");
  const [requiredScore, setRequiredScore] = useState("");

  const handleVideoSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar alguna lógica para guardar el video con el ID "videoId"
    // en la sección correspondiente de la asignatura
    console.log("Video submitted:", videoId);
    setVideoId("");
  };

  const savePdfToAsignatura = async (file) => {
    // Aquí puedes implementar la lógica para guardar el archivo PDF en la asignatura
    // Utiliza las funcionalidades necesarias, como enviar una solicitud HTTP al servidor o utilizar una API de almacenamiento
    // Retorna una promesa que se resuelve cuando el archivo se guarda correctamente
    return new Promise((resolve, reject) => {
      // Simulación de la lógica de guardado exitoso después de 2 segundos
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (pdfFile) {
      try {
        // Lógica para guardar el archivo PDF en la asignatura
        await savePdfToAsignatura(pdfFile);
        console.log("PDF submitted:", pdfFile);
        setPdfFile(null);
      } catch (error) {
        console.error("Error al guardar el archivo PDF:", error);
      }
    }
  };

  const handleGradeCalculation = (e) => {
    e.preventDefault();
    // Aquí puedes realizar el cálculo de notas para determinar la puntuación requerida
    // y mostrarla en la interfaz de usuario
    console.log("Desired grade:", desiredGrade);
    // Realizar los cálculos necesarios y guardar el resultado en "requiredScore"
    setRequiredScore("8.5"); // Ejemplo de puntuación requerida
    setDesiredGrade("");
  };

  // Obtener la ruta actual de la página web
  const currentPath = window.location.pathname;

// Extraer el campo deseado de la ruta actual (por ejemplo, la sigla)
  const desiredField = currentPath.split("/")[2];
  //console.log(desiredField);
  // Realizar la comparación con los campos del archivo JSON
  const asignaturaData = rdata.find((item) => item.sigla === desiredField);
  //const asignaturaData_vid = asignaturaData.archivo_video_id;
  const { archivo_video_id: listaVideos } = asignaturaData;

  

  return (
    <div>
      <h2>{asignatura}</h2>

      <h3>Videos</h3>
      <Form>
        <Form.Label>Videos de la Asignatura</Form.Label>
        {listaVideos.map((item) => (
            <div key = {item}>
            <YouTube videoId={item} />  
          </div>
        ))}
      </Form>
      <Form onSubmit={handleVideoSubmit}>
        <Form.Group>
          <Form.Label>Video ID</Form.Label>
          <Form.Control type="text" value={videoId} onChange={(e) => setVideoId(e.target.value)} />
        </Form.Group>
        <Button type="submit">Agregar Video</Button>
      </Form>

      {videoId && (
        <div>
          <h4>Video Agregado:</h4>
          <YouTube videoId={videoId} />
        </div>
      )}

      <h3>Archivos PDF</h3>
      <Form onSubmit={handleFileSubmit}>
        <Form.Group>
          <Form.Label>Seleccionar PDF</Form.Label>
          <Form.Control type="file" onChange={(e) => setPdfFile(e.target.files[0])} />
        </Form.Group>
        <Button type="submit">Subir PDF</Button>
      </Form>

      <h3>Cálculo de Notas</h3>
      <Form onSubmit={handleGradeCalculation}>
        <Form.Group>
          <Form.Label>Nota Deseada</Form.Label>
          <Form.Control type="text" value={desiredGrade} onChange={(e) => setDesiredGrade(e.target.value)} />
        </Form.Group>
        <Button type="submit">Calcular Puntuación Requerida</Button>
      </Form>

      {requiredScore && (
        <div>
          <h4>Puntuación Requerida para Obtener la Nota Deseada:</h4>
          <p>{requiredScore}</p>
        </div>
      )}
    </div>
  );
};

export default AsignaturaDetalle;
