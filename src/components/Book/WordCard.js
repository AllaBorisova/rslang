import React from 'react'
// import WordCard from 'WordCard.css'
import './WordCard.scss'

function WordCard({ props }) {
    const img = `https://teamwork-rs.herokuapp.com/${props.image}`
    const audio = `https://teamwork-rs.herokuapp.com/${props.audio}`
    const audioMeaning = `https://teamwork-rs.herokuapp.com/${props.audioMeaning}`
    const audioExample = `https://teamwork-rs.herokuapp.com/${props.audioExample}`
    const {
        word,
        transcription,
        wordTranslate,
        textMeaning,
        textMeaningTranslate,
        textExample,
        textExampleTranslate,
        id,
    } = props
    return (
        <div className="wordCard">
            <img src={img} alt={word} />
            <div className="wordCard__word">
                <div className='wordCard__wordTranscrTransl'>
                    <p>{word}</p>
                    <p>{transcription}</p>
                    <p>{wordTranslate}</p>
                </div>
                <audio controls src={audio}>
                    <track default kind="captions" srcLang="en" />
                </audio>
            </div>

            <div className="wordCard__example">
                <p>{textMeaning}</p>
                <p>{textMeaningTranslate}</p>
                <audio controls src={audioMeaning}>
                    <track default kind="captions" srcLang="en" />
                </audio>
            </div>

            <div className="wordCard__example">
                <p>{textExample}</p>
                <p>{textExampleTranslate}</p>
                <audio controls src={audioExample}>
                    <track default kind="captions" srcLang="en" />
                </audio>
            </div>

            <div className="btn-card-control">
                <button type="button" className="btn-add" value={id}>
                    Добавить в сложные
                </button>
                <button type="button" className="btn-remove" value={id}>
                    Удалить
                </button>
            </div>
        </div>
    )
}

export default WordCard
