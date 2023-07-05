import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const users = require("./../data/users.json");

function ModalForm({ show, handleClose }) {
  const [error, setError] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    const email = event.target.elements.formBasicEmail.value;
    const password = event.target.elements.formBasicPassword.value;

    const user = users.find((user) => user.username === email && user.clave === password);

    if (user) {
      setError('');
      console.log('Inicio de sesión exitoso');
      // Establecer la cookie después de un inicio de sesión exitoso
      setCookie('isLoggedIn', 'true', 1);
      // Realizar acciones adicionales para el inicio de sesión exitoso
    } else {
      setError('Credenciales incorrectas');
      console.log('Credenciales incorrectas');
      // Mostrar un mensaje de error o realizar acciones adicionales para el inicio de sesión fallido
    }
  };

  return (
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