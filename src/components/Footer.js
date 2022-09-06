import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'

function Footer() {
    return (
        <footer className="my-2">
            <Container>
                <Row>
                    <Col>
                        <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
                            <img src="./public/rs_school.svg" className="img-fluid footer-img" alt="" />
                        </a>
                    </Col>
                    <Col md={6}>
                        <Nav className="justify-content-center">
                            <Nav.Item>
                                <Nav.Link href="https://github.com/Harleycat80">@Harleycat80</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="https://github.com/alexsmirnova13">@alexsmirnova13</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="https://github.com/AllaBorisova">@AllaBorisova</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col className="text-end">@2022</Col>
                </Row>
            </Container>
        </footer>
    )
}
export default Footer
