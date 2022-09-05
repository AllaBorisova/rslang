import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'

function DifficultiesScreen(props) {
    const { action } = props
    const { game } = props
    return (
        <Row className="p-5 justify-content-center text-center">
            <Col md={6}>
                <h1>{game}</h1>
                <p>Выберите уровень</p>
                <Button variant="primary" data-level="0" onClick={action}>
                    1
                </Button>{' '}
                <Button variant="secondary" data-level="1" onClick={action}>
                    2
                </Button>{' '}
                <Button variant="success" data-level="2" onClick={action}>
                    3
                </Button>{' '}
                <Button variant="warning" data-level="3" onClick={action}>
                    4
                </Button>{' '}
                <Button variant="danger" data-level="4" onClick={action}>
                    5
                </Button>{' '}
                <Button variant="info" data-level="5" onClick={action}>
                    6
                </Button>{' '}
            </Col>
        </Row>
    )
}

export default DifficultiesScreen
