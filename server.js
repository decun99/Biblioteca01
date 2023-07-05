const express = require('express');
const app = express();
const port = 3001; // Puerto en el que el servidor escuchará las solicitudes

app.use(express.json());

// Ruta para obtener el JSON
app.get('/json', (req, res) => {
  // Aquí puedes leer el JSON desde el archivo y enviarlo como respuesta
  const jsonData = require("./src/components/ramos.json");
  res.json(jsonData);
});

// Ruta para editar el JSON
app.post('/json', (req, res) => {
  const updatedData = req.body; // Datos enviados en el cuerpo de la solicitud
  // Aquí puedes actualizar el JSON en el servidor con los datos recibidos
  // y luego enviar una respuesta
  res.json({ success: true });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
