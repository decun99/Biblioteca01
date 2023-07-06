const express = require('express');
const app = express();
const port = 3001; // Puerto en el que el servidor escuchará las solicitudes
const cors = require('cors');
app.use(cors());

// Resto de la configuración del servidor

let rutaramos = "./src/data/ramos.json";
let rutamisem = "./src/data/ramosMiSemestreMock.json";

app.use(express.json());

// Ruta para obtener el JSON
app.get('/jsonramos', (req, res) => {
  // Aquí puedes leer el JSON desde el archivo y enviarlo como respuesta
  const jsonData = require(rutaramos);
  res.json(jsonData);
});

app.get('/jsonmisem', (req, res) => {
  // Aquí puedes leer el JSON desde el archivo y enviarlo como respuesta
  const jsonData = require(rutamisem);
  res.json(jsonData);
});

// Ruta para editar el JSON
const fs = require('fs');
const { json } = require('react-router-dom');

// Ruta para editar el JSON
app.post('/jsonramos', (req, res) => {
  const updatedData = req.body; // Datos enviados en el cuerpo de la solicitud
  const jsonData = require(rutaramos); // Lee el JSON desde el archivo

  //console.log("jsonData:", jsonData);
  //console.log("\nupdatedData:", updatedData);

  jsonData.push(updatedData);

//  console.log("jsonData:", jsonData);

  const jsonContent = JSON.stringify(jsonData);

  // Sobrescribe el archivo con los nuevos datos
  fs.writeFileSync(rutaramos, jsonContent, 'utf8');
});

// Ruta para editar el JSON
app.post('/jsonmisem', (req, res) => {
  const updatedData = req.body; // Datos enviados en el cuerpo de la solicitud
  const jsonData = require(rutamisem); // Lee el JSON desde el archivo

  //console.log("jsonData:", jsonData);
  //console.log("\nupdatedData:", updatedData);

  jsonData.push(updatedData);

//  console.log("jsonData:", jsonData);

  const jsonContent = JSON.stringify(jsonData);

  // Sobrescribe el archivo con los nuevos datos
  fs.writeFileSync(rutamisem, jsonContent, 'utf8');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});