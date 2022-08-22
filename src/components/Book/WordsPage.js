import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import WordCard from './WordCard'
import '../../styles/App.scss'


function Loading() {
    return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}
function WordsPage({ words, loading, props }) {
    const currentstyle = {
        backgroundColor: 'white',
    }
    switch (props) {
        case '0':
            currentstyle.backgroundColor = '#E0FFFF'
            break
        case '1':
            currentstyle.backgroundColor = '#FFFACD'
            break
        case '2':
            currentstyle.backgroundColor = '#98FB98'
            break
        case '3':
            currentstyle.backgroundColor = '#FFFFF0'
            break
        case '4':
            currentstyle.backgroundColor = '#D3D3D3'
            break
        case '5':
            currentstyle.backgroundColor = '#FFA07A'
            break
        default:
            return '#FFFFFF'
    }
    if (loading) {
        return <p>{Loading()}</p>
    }
    return (
        <div className="word-wrapper" style={currentstyle}>
            <ul>
                {words.map((item) => (
                    <li className="group-words" key={item.id}>
                        <WordCard props={item} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default WordsPage
