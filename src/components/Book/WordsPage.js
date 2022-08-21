import React from 'react'
import WordCard from './WordCard'

function WordsPage({ words, loading }) {
    if (loading) {
        return <h3>Loading...</h3>
    }
    return (
        <div>
            <ul>
                {words.map((item) => (
                    <li className="group-words" key={item.id}>
                        <WordCard
                            image={item.image}
                            word={item.word}
                            transc={item.transcription}
                            translate={item.wordTranslate}
                            examp={item.textExample}
                            examptrans={item.textExampleTranslate}
                            meaning={item.textMeaning}
                            examplmeaning={item.textMeaningTranslate}
                            audio1={item.audio1}
                            audio2={item.audioExample}
                            audio3={item.audioMeaning}
                            id={item.id}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default WordsPage
