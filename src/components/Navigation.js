import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function Navigation() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#">Меню</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link as={Link} to="/">
                            Главная
                        </Nav.Link>

                        <Nav.Link as={Link} to="/textbook">
                            Учебник
                        </Nav.Link>

                        <Nav.Link as={Link} to="/audiocall">
                            Аудиовызов
                        </Nav.Link>

                        <Nav.Link as={Link} to="/sprint">
                            Спринт
                        </Nav.Link>
                        <Nav.Link as={Link} to="/statistics">
                            Статистика
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation
