import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import PropTypes from 'prop-types';
import useToken from './Auth/UseToken';
import { loginUser, signUpUser, getUser } from './Auth/ApiUser';

function LoginPopup({ setToken }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password,
        });
        setToken(token);
    };

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>
                Login
            </Button>{' '}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                minLength="8"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

LoginPopup.propTypes = {
    setToken: PropTypes.func.isRequired,
};

function SignUp({ setToken }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await signUpUser({
            name,
            email,
            password,
        });
        setToken(token);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Sign-up
            </Button>{' '}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign-up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                minLength="8"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Sign-up
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

SignUp.propTypes = {
    setToken: PropTypes.func.isRequired,
};

function Header() {
    const { userId, setToken } = useToken();
    const [isLoggedin, setIsLoggedin] = useState(false);

    if ( !userId ) {
       
        return (
            <header className="my-2">
                <Container>
                    <Row className="align-items-center">
                        <Col xs={4}>
                            <h1>RSLANG</h1>
                        </Col>

                        <Col xs={8} className="text-end">
                            <LoginPopup setToken={setToken} />
                            <SignUp setToken={setToken} />
                        </Col>
                    </Row>
                </Container>
            </header>
        );
    }
    const userDataString = localStorage.getItem( 'userData' )
    const userData = JSON.parse( userDataString )
    
    const logout = () => {
        localStorage.removeItem('userData');
        window.location.reload()
      };
 
    
    return (
        <header className="my-2">
            <Container>
                <Row className="align-items-center">
                    <Col xs={4}>
                        <h1>RSLANG</h1>
                    </Col>

                    <Col xs={8} className="text-end">
                        Привет, {userData.name} 
                        <Button className="ms-1" variant="primary" onClick={logout}>Выйти</Button>
                        
                    </Col>
                </Row>
            </Container>
        </header>
    );
}

export default Header;
