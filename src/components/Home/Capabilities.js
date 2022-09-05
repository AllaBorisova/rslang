import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Capabilities() {
    return (
        <section className="my-4">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h2 className="display-5 fw-bold mb-4">Возможности и преимущества приложения</h2>
                        <ul>
                            <li>
                                Нескучное онлайн-обучение английскому языку с помощью игр и интересных заданий в любое
                                удобное для вас время.
                            </li>
                            <li>
                                Сможете рассказать о себе и поговорить на бытовые темы, где живете, работаете,
                                рассказать о хобби, будете чувствовать себя уверенно в другой стране.
                            </li>
                            <li>
                                Освоите базовую грамматику, сможете поддержать разговор о погоде, работе и увлечениях.
                            </li>
                        </ul>
                    </Col>
                    <Col md={6}>
                        <img src="./public/6308.jpg" className="img-fluid" alt="..." />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Capabilities
