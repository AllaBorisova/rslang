import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import { NavLink } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'
import WordsPage from '../components/Book/WordsPage'
import GetStorage from '../components/Book/LocalStorage'
import GetDiffWords from '../components/Book/GetDiffWords'

function Dictionary() {
    const user = GetStorage('userData', '')[0]
    const list = GetDiffWords()[0]
    return (
        <section className="py-4">
            <Container>
                <Row className="pb-5 justify-content-between align-items-center">
                    <Col>
                        <h1>Difficult</h1>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button as={NavLink} to="/textbook" className="m-1">
                            Вернуться к учебнику
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <div className="word-wrapper">
                        <WordsPage words={list} props="0" user={user} dict />
                    </div>
                </Row>
            </Container>
        </section>
    )
}

export default Dictionary
