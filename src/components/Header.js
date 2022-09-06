import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { NavLink } from 'react-router-dom'
import Navigation from './Navigation'

function Header(props) {
    const { token, logout, setToken } = props

    return (
        <header className="my-2">
            <Container>
                <Row className="align-items-center">
                    <Col>
                        <h1>
                            <NavLink to="/">RSLANG</NavLink>
                        </h1>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-end">
                        <Navigation token={token} logout={logout} setToken={setToken} />
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

export default Header
