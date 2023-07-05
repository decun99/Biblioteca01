const express = require('express');
const app = express();
const port = 3001; // Puerto en el que el servidor escuchará las solicitudes
const cors = require('cors');
app.use(cors());

// Resto de la configuración del servidor

let ruta = "./src/data/ramos.json";

app.use(express.json());

// Ruta para obtener el JSON
app.get('/json', (req, res) => {
  // Aquí puedes leer el JSON desde el archivo y enviarlo como respuesta
  const jsonData = require(ruta);
  res.json(jsonData);
});

// Ruta para editar el JSON
const fs = require('fs');
const { json } = require('react-router-dom');

// Ruta para editar el JSON
app.post('/json', (req, res) => {
  const updatedData = req.body; // Datos enviados en el cuerpo de la solicitud
  const jsonData = require(ruta); // Lee el JSON desde el archivo

  //console.log("jsonData:", jsonData);
  //console.log("\nupdatedData:", updatedData);

  jsonData.push(updatedData);

//  console.log("jsonData:", jsonData);

  const jsonContent = JSON.stringify(jsonData);

  // Sobrescribe el archivo con los nuevos datos
  fs.writeFileSync(ruta, jsonContent, 'utf8');

  /* // Actualiza el JSON en el servidor con los datos concatenados
   fs.writeFile('./src/components/ramos.json', JSON.stringify(concatenatedData), 'utf8', (err) => {
     if (err) {
       console.error('Error al guardar los datos en el archivo:', err);
       res.status(500).json({ success: false, error: 'Error al guardar los datos en el archivo' });
     } else {
       console.log('Datos guardados en el archivo correctamente');
       res.json({ success: true });
     }
   });*/
  //console.log(concatenatedData);
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
