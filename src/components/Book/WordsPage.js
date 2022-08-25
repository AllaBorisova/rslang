import React from 'react'
import WordCard from './WordCard'
import '../../styles/App.scss'
import Loading from '../Loading'

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
        return <Loading />
    }
    return (
        <div className="word-wrapper" style={currentstyle}>
            {words.map((item) => (
                <div className="group-words" key={item.id}>
                    <WordCard props={item} />
                </div>
            ))}
        </div>
    )
}

export default WordsPage
