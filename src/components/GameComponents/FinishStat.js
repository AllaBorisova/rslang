import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Table from 'react-bootstrap/esm/Table'
import Badge from 'react-bootstrap/esm/Badge'
import Button from 'react-bootstrap/esm/Button'
import Score from '../Sprint/Score'

function FinishStat(props) {
    const { score } = props
    const { rightAnswers } = props
    const { wrongAnswers } = props
    const { handleClickRestart } = props
    return (
        <Row className="justify-content-center">
            <Col md={4} className="p-5 mb-4 bg-light rounded-3 text-center">
                <h2>Результаты</h2>
                {(score || score === 0) && <Score value={score} />}
                <h3>
                    Правильные ответы <Badge bg="success">{rightAnswers.length}</Badge>
                </h3>
                <Table striped>
                    <tbody>
                        {rightAnswers.map((element) => (
                            <tr key={element.wordId}>
                                <td>{element.word}</td>
                                <td>{element.transcription}</td>
                                <td>{element.wordTranslate}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <h3>
                    Ошибки <Badge bg="danger">{wrongAnswers.length}</Badge>
                </h3>
                <Table striped>
                    <tbody>
                        {wrongAnswers.map((element) => (
                            <tr key={element.wordId}>
                                <td>{element.word}</td>
                                <td>{element.transcription}</td>
                                <td>{element.wordTranslate}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button variant="primary" onClick={handleClickRestart}>
                    Еще разок
                </Button>{' '}
            </Col>
        </Row>
    )
}

export default FinishStat
