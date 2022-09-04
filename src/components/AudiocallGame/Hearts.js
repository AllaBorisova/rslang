import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

function Hearts(props) {
    const { counter } = props;

    return (
        <div>
            <Row>
                <Col>
                    {[...Array(counter)].map((i, index) => (
                        <i key={index} className="bi bi-heart-fill text-danger m-1" style={{ fontSize: 30 }}></i>
                    ))}
                </Col>
            </Row>
        </div>
    );
}
export default Hearts;
