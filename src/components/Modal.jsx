import React, { useState, useContext } from 'react'; // Importar useContext
import { Button, Modal, Form } from 'react-bootstrap';
import UserContext from './UserContext'; // Importar UserContext
import users from '../data/users.json';
var userglobal = '';

function setCookie(cname, cvalue, exdays) {//Generación de una coockie con la información de sesión del usuario (forma preliminar de emplear el sistema de autenticación del usuaio, eventualmente reemplazable)
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

///const users = require("./../data/users.json");


function ModalForm({ show, handleClose}) {
  const { setUsername } = useContext(UserContext); // Acceder a setUsername a través del contexto
  const [error, setError] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    const email = event.target.elements.formBasicEmail.value;//comprobamos las credenciales ingresadas por el usuario
    const password = event.target.elements.formBasicPassword.value;

    const user = users.find((user) => user.username === email && user.clave === password);

    if (user) {
      setError('');
      console.log('Inicio de sesión exitoso');
      // Establecer la cookie después de un inicio de sesión exitoso
      userglobal = user;
      setCookie('isLoggedIn', 'true', 1);
      // Actualizar el nombre de usuario en el contexto
      setUsername(email);
      handleClose(); // Cierra el modal después del inicio de sesión exitoso
    } else {
      setError('Credenciales incorrectas');
      console.log('Credenciales incorrectas');
      // Mostrar un mensaje de error o realizar acciones adicionales para el inicio de sesión fallido
    }
  };

  return (//Nuevamente, generamos la ventana interactiva, en este caso para el inicio de sesión el usuario (particularmente, en este contexto fue más tentador emplear una ventana emergente, para no entorpecer mucho la interacción con la página)
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        {error && <p>{error}</p>}
      </Modal.Body>
    </Modal>
  );
}

export default ModalForm;