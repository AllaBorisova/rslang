import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

function TeamMember(props) {
    const { avatar, name, text, link } = props
    return (
        <Card>
            <Card.Img variant="top" src={`./public/${avatar}`} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{text}</Card.Text>
                <Card.Link href={link} target="_blank">
                    GitHub
                </Card.Link>
            </Card.Body>
        </Card>
    )
}

function Team() {
    return (
        <section className="my-4 text-center">
            <Container>
                <Row className="justify-content-center">
                    <Col>
                        <h2 className="display-5 fw-bold  mb-3">Наша команда</h2>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col>
                        <TeamMember
                            name="Harleycat80"
                            text="Волевым решением определила стек, чем способствовала развитию и совершенствованию навыков всей команды. Сделала функционал Электронный учебник, функционал Список слов и Изученные слова."
                            link="https://github.com/Harleycat80"
                            avatar="72-722180_these-are-some-cats-avatar-i-drew-during-my-free-time-black.png"
                        />
                    </Col>
                    <Col>
                        <TeamMember
                            name="alexsmirnova13"
                            text="Делилась знаниями, опытом, наработками и прокачивала команду. Сделала игру Аудиовызов, вызов игр из учебника, статистику изученных слов в учебнике. Прогрессор и критик без страха и эмпатии. Гуру рефакторинга."
                            link="https://github.com/alexsmirnova13"
                            avatar="123-1236782_these-are-some-cats-avatar-i-drew-during-my-free-time-portrait.png"
                        />
                    </Col>
                    <Col>
                        <TeamMember
                            name="AllaBorisova"
                            text="Дизайн, новые знания для команды. Сделала главная страница, Авторизация, Игра Спринт. Создала гит, потому и тимлид."
                            link="https://github.com/AllaBorisova"
                            avatar="123-1237090_these-are-some-cats-avatar-i-drew-during-my-free-time-animated.png"
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Team
