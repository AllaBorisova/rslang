import React from 'react'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import LoginPopup from './LoginPopup'
import SignUp from './SingUp'

function Navigation(props) {
    const { token, logout, setToken } = props
    return (
        <Navbar expand="lg">
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
                    {!token && (
                        <>
                            <LoginPopup setToken={setToken} />
                            <SignUp setToken={setToken} />
                        </>
                    )}
                    {token && (
                        <Button className="ms-1" variant="primary" onClick={logout}>
                            Выйти
                        </Button>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation
