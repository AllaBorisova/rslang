import React from 'react'
import '../../styles/WordCard.scss'
import ButtonGroup from './ButtonGroup'

function WordCard({ props, user, dict }) {
    console.log(dict)
    const { userId } = user
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
    if (!userId) {
        return (
            <div className="wordCard">
                <img src={img} alt={word} />
                <div className="wordCard__word">
                    <div className="wordCard__wordTranscrTransl">
                        <p>{word}</p>
                        <p>{transcription.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                        <p>{wordTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                    </div>
                    <audio controls src={audio}>
                        <track default kind="captions" srcLang="en" />
                    </audio>
                </div>

                <div className="wordCard__example">
                    <p>{textMeaning.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                    <p>{textMeaningTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                    <audio controls src={audioMeaning}>
                        <track default kind="captions" srcLang="en" />
                    </audio>
                </div>

                <div className="wordCard__example">
                    <p>{textExample.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                    <p>{textExampleTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                    <audio controls src={audioExample}>
                        <track default kind="captions" srcLang="en" />
                    </audio>
                </div>
            </div>
        )
    }

    return (
        <div className="wordCard">
            <img src={img} alt={word} />
            <div className="wordCard__word">
                <div className="wordCard__wordTranscrTransl">
                    <p>{word}</p>
                    <p>{transcription.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                    <p>{wordTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                </div>
                <audio controls src={audio}>
                    <track default kind="captions" srcLang="en" />
                </audio>
            </div>

            <div className="wordCard__example">
                <p>{textMeaning.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                <p>{textMeaningTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                <audio controls src={audioMeaning}>
                    <track default kind="captions" srcLang="en" />
                </audio>
            </div>

            <div className="wordCard__example">
                <p>{textExample.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                <p>{textExampleTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                <audio controls src={audioExample}>
                    <track default kind="captions" srcLang="en" />
                </audio>
            </div>
            <ButtonGroup id={id} props={user} />
        </div>
    )
}

export default WordCard
