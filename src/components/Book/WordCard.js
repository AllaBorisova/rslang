import React, { useEffect, useState } from 'react'
import '../../styles/WordCard.scss'
import ButtonGroup from './ButtonGroup'
import Player from './Player'

const USER_URL = `https://teamwork-rs.herokuapp.com/users/`

function WordCard(props) {
    const { items, user, dict, currentstyle } = props
    const { userId, token } = user
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
    const [status, setStatus] = useState(null)
    const SetHardStyle = () => {
        setStatus('hard')
    }
    const SetEasyStyle = () => {
        setStatus('easy')
    }
    useEffect(() => {
        const CheckWord = async () => {
            await fetch(`${USER_URL}${userId}/words/${ourId}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((data) => data.json())
                .then((result) => {
                    setStatus(result.difficulty)
                })
                .catch((e) => {
                    console.log('fail')
                })
        }
        CheckWord()
    })
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

    let statusStyle = ''
    switch (status) {
        case 'easy':
            statusStyle = '0 0 2px #ffffff, 0 0 5px #ffffff, 0 0 8px #00ff00, 0 0 10px #00ff00'
            break
        case 'hard':
            statusStyle = '0 0 2px #ffffff, 0 0 5px #ffffff,  0 0 8px #ff0000, 0 0 10px #ff0000'
            break
        case null:
            statusStyle = ''
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
                action={[HideTheCard, SetHardStyle, SetEasyStyle]}
            />
        </div>
    )
}

export default WordCard
