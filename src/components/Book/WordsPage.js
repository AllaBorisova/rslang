import React from 'react'

import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import WordCard from './WordCard'
import '../../styles/App.scss'
import Loading from '../Loading'

function WordsPage({ words, loading, user, dict, group, page }) {
    let currentstyle = 'white'
    switch (group) {
        case '0':
            currentstyle = '#E0FFFF'
            break
        case '1':
            currentstyle = '#FFFACD'
            break
        case '2':
            currentstyle = '#98FB98'
            break
        case '3':
            currentstyle = '#FFFFF0'
            break
        case '4':
            currentstyle = '#D3D3D3'
            break
        case '5':
            currentstyle = '#FFA07A'
            break
        default:
            return currentstyle
    }
    // let backStyle = ''
    // switch (marked) {
    //     case true:
    //         backStyle = '#737778'
    //         break
    //     case false:
    //         backStyle = ''
    //         break
    //     default:
    //         return backStyle
    // }

    if (loading) {
        return <Loading />
    }
    return (
        <Row className="word-wrapper">
            {words.map((item) => (
                <Col md={6} className="group-words" key={item.word} >
                    <WordCard items={item} user={user} dict={dict} currentstyle={currentstyle} />
                </Col>
            ))}
        </Row>
    )
}

export default WordsPage
