import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'

function Question({ originalWord, onAnswerRight, onAnswerWrong, really, otherWord, sprintScore }) {
    return (
        <div>
            <Row className="p-2">
                <Col>
                    <h3>{originalWord.word}</h3>
                    <h4>{otherWord.wordTranslate}</h4>
                </Col>
            </Row>
            <Row className="p-2">
                <Col>
                    {really && (
                        <>
                            {' '}
                            <ButtonGroup>
                                <Button variant="success" onClick={() => onAnswerRight(sprintScore, originalWord)}>
                                    Верно
                                </Button>
                                <Button variant="danger" onClick={() => onAnswerWrong(originalWord)}>
                                    Неверно
                                </Button>
                            </ButtonGroup>
                        </>
                    )}
                    {!really && (
                        <>
                            {' '}
                            <ButtonGroup>
                                <Button variant="success" onClick={() => onAnswerWrong(otherWord)}>
                                    Верно
                                </Button>
                                <Button variant="danger" onClick={() => onAnswerRight(sprintScore, otherWord)}>
                                    Неверно
                                </Button>
                            </ButtonGroup>
                        </>
                    )}
                </Col>
            </Row>
        </div>
    )
}

export default Question
