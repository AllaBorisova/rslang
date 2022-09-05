import React from 'react'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import WordCard from './WordCard'
import '../../styles/App.scss'
import Loading from '../Loading'

function WordsPage({ words, loading, user, dict, props, action, count }) {
    let currentstyle = 'black'
    switch (props) {
        case '0':
            currentstyle = '#0dcaf0'
            break
        case '1':
            currentstyle = '#ffc107'
            break
        case '2':
            currentstyle = '#198754'
            break
        case '3':
            currentstyle = '#0d6efd'
            break
        case '4':
            currentstyle = '#212529'
            break
        case '5':
            currentstyle = '#dc3545'
            break
        default:
            return currentstyle
    }
    if (loading) {
        return <Loading />
    }
    return (
        <Row className="word-wrapper">
            {words.map((item) => (
                <Col md={12} className="group-words" key={item.word}>
                    <WordCard
                        items={item}
                        user={user}
                        dict={dict}
                        currentstyle={currentstyle}
                        action={action}
                        count={count}
                    />
                </Col>
            ))}
        </Row>
    )
}

export default WordsPage
