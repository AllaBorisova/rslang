import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import { NavLink } from 'react-router-dom'
import WordsPage from '../components/Book/WordsPage'
import GetDiffWords from '../components/Book/GetDifficultWord'
import GetStorage from '../components/Book/LocalStorage'

function Dictionary() {
    const user = GetStorage('userData', '')[0]
    if (!user) {
        return null
    }
    const list = GetDiffWords(user)[0]
    return (
        <section>
            <Container>
                <Row className="pb-5">
                    <Col>
                        <h1>Difficult</h1>
                    </Col>
                </Row>
                <Row>
                    <NavLink to="/textbook">Вернуться к учебнику</NavLink>
                    <div className="word-wrapper">
                        <WordsPage words={list} props="0" user={user} dict />
                    </div>
                </Row>
            </Container>
        </section>
    )
}

export default Dictionary
