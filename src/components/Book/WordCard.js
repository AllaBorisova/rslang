import React, { useState } from 'react'
import '../../styles/WordCard.scss'
import ButtonGroup from './ButtonGroup'
import CheckStatus from './CheckWord'
import Player from './Player'

function WordCard(props) {

    const { items, user, dict, currentstyle, action, count } = props
    const {
        word,
        transcription,
        wordTranslate,
        textMeaning,
        textMeaningTranslate,
        textExample,
        textExampleTranslate,
        id,
    } = items
    let ourId = id
    if (dict) {
        // eslint-disable-next-line no-underscore-dangle
        ourId = items._id
    }
    const [hidden, setHiden] = useState(true)
    const HideTheCard = () => {
        setHiden(false)
    }

    const [status, setStatus] = CheckStatus(id)
    const [isActive, setActive] = useState(false)
    const [isActiveHard, setActiveHard] = useState(false)

    const SetHardStyle = () => {
        setActiveHard(!isActiveHard)
        setActive()
        setStatus('hard')
    }
    const SetEasyStyle = () => {
        setActive(!isActive)
        setActiveHard(false)
        setStatus('easy')
    }

    const img = `https://teamwork-rs.herokuapp.com/${items.image}`

    const [sound] = useState([
        {
            src: `https://teamwork-rs.herokuapp.com/${items.audio}`,
        },

        { src: `https://teamwork-rs.herokuapp.com/${items.audioMeaning}` },
        {
            src: `https://teamwork-rs.herokuapp.com/${items.audioExample}`,
        },
    ])

    if (!user) {
        return (
            <div className="wordCard" style={{ background: currentstyle }}>
                <img src={img} alt={word} />
                <div className="wordCard__word">
                    <div className="wordCard__wordTranscrTransl">
                        <p>{word}</p>
                        <p>{transcription.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                        <p>{wordTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                    </div>
                    <Player sound={sound} />
                </div>

                <div className="wordCard__example">
                    <p>{textMeaning.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                    <p>{textMeaningTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                </div>

                <div className="wordCard__example">
                    <p>{textExample.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                    <p>{textExampleTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                </div>
            </div>
        )
    }

    let statusStyle = ``
    switch (status) {
        case 'easy':
            statusStyle = '0 0 2px #ffffff, 0 0 5px #ffffff, 0 0 8px #00ff00, 0 0 10px #00ff00'
            break
        case 'hard':
            statusStyle = '0 0 2px #ffffff, 0 0 5px #ffffff,  0 0 8px #ff0000, 0 0 10px #ff0000'
            break
        case undefined:
            statusStyle = '0 0 2px #ffffff, 0 0 5px #ffffff'
            break
        default:
            return statusStyle
    }
    return (
        <div
            className="wordCard"
            style={{
                background: currentstyle,
                display: hidden ? 'block' : 'none',
                boxShadow: statusStyle,
            }}
        >
            <img src={img} alt={word} />
            <div className="wordCard__word">
                <div className="wordCard__wordTranscrTransl">
                    <p>{word}</p>
                    <p>{transcription.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                    <p>{wordTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                </div>
                <Player sound={sound} />
            </div>

            <div className="wordCard__example">
                <p>{textMeaning.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                <p>{textMeaningTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
            </div>

            <div className="wordCard__example">
                <p>{textExample.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                <p>{textExampleTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
            </div>
            <ButtonGroup
                status={status}
                id={ourId}
                user={user}
                dict={dict}
                action={[HideTheCard, SetHardStyle, SetEasyStyle, action]}
                count={count}
                easy={isActive}
                hard={isActiveHard}
            />
        </div>
    )
}

export default WordCard
