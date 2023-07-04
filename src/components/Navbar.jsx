import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ModalForm from './Modal';

function NavbarComponent() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">LECTURE-LOCKER🔒</Navbar.Brand>
          <Nav className="me-auto" variant="tabs">
            <Nav.Item>
              <Nav.Link href="/asignaturas">Asignaturas</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/login" onClick={handleShowModal}>Mi cuenta</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/currentsemester">Mi semestre</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>

      <ModalForm show={showModal} handleClose={handleCloseModal} />
    </>
  );
}

export default NavbarComponent;
