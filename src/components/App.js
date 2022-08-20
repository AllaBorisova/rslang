import React, { useState } from "react"
import 'bootstrap/scss/bootstrap.scss';
import "../styles/App.scss"


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';




function App () {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <header>
      <Container>
        <Row>
          <Col>
            <h1>RSLANG</h1>
          </Col>
          <Col xs={6}>
          <Nav defaultActiveKey="/">
            <Nav.Item>
              <Nav.Link href="/">Главная</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="№" eventKey="textbook">Учебник</Nav.Link>
            </Nav.Item>
            
          </Nav>
          </Col>
          <Col>
            <Button variant="outline-primary" onClick={handleShow}>Login</Button>{' '}
            <Button variant="primary">Sign-up</Button>{' '}
          </Col>
        </Row>
      </Container>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Agree" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </Modal.Body>
        
      </Modal>
    </header>
  );
}

export default App
