import React, { useEffect, useState } from 'react'
import '../../styles/WordCard.scss'
import Col from 'react-bootstrap/esm/Col'
import ButtonGroup from './ButtonGroup'
import CheckStatus from './CheckWord'
import Player from './Player'

function WordCard(props) {
    const { items, user, dict, currentstyle, action, count } = props
    const { token } = user
    const { userId } = user
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
    const [correct, setCorrect] = useState(0)
    const [wrong, setWrong] = useState(0)
    const [allScore, setAllScore] = useState(0)

    const SetHardStyle = () => {
        setActiveHard(!isActiveHard)
        setActive()
        setStatus('hard')
    }
    const getUserAggregatedWordsOneWord = async (wordId) => {
        const resp = await fetch(`https://teamwork-rs.herokuapp.com/users/${userId}/words/${wordId}`, {
            method: 'GET',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        })
        if (resp.ok) {
            const data = await resp.json()
            setCorrect((Number(data.optional.sprint.correct) || 0) + (Number(data.optional.audiocall.correct) || 0))
            setWrong((Number(data.optional.sprint.wrong) || 0) + (Number(data.optional.audiocall.wrong) || 0))
            setAllScore(wrong + correct)
        }
    }
    useEffect(() => {
        getUserAggregatedWordsOneWord(id)
    }, [allScore, userId, id, token, wrong, correct])

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
            <div className="wordCard d-flex p-4">
                <Col md={4}>
                    <img src={img} alt={word} />
                </Col>
                <Col md={8} className="wordCard__right">
                    <div>
                        <div className="wordCard__word">
                            <div className="wordCard__wordTranscrTransl" style={{ borderColor: currentstyle }}>
                                <p className="fs-3 fw-bold">{word}</p>
                                <p className="fs-4">{transcription.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                                <p className="fs-5 flex-full fst-italic">
                                    {wordTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}
                                </p>
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
                </Col>
            </div>
        )
    }

    let statusStyle = ``
    switch (status) {
        case 'easy':
            statusStyle = '#d1e7dd'
            break
        case 'hard':
            statusStyle = '#f8d7da'
            break
        case undefined:
            statusStyle = '#ffffff'
            break
        default:
            return statusStyle
    }
    if (dict) {
        statusStyle = '#f8d7da'
    }
    return (
        <div
            className="wordCard p-4"
            style={{
                display: hidden ? 'flex' : 'none',
                background: statusStyle,
            }}
        >
            <Col md={4}>
                <p>
                    {' '}
                    верно {correct} из {allScore}
                </p>
                <img src={img} alt={word} />
            </Col>
            <Col md={8} className="wordCard__right">
                <div className="wordCard__word">
                    <div className="wordCard__wordTranscrTransl" style={{ borderColor: currentstyle }}>
                        <p className="fs-3 fw-bold">{word}</p>
                        <p className="fs-4">{transcription.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                        <p className="fs-5 flex-full fst-italic">
                            {wordTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}
                        </p>
                    </div>
                    <Player sound={sound} />
                </div>

                <div className="wordCard__example">
                    <p>{textMeaning.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                    <p className="text-muted">{textMeaningTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                </div>

                <div className="wordCard__example">
                    <p>{textExample.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                    <p className="text-muted">{textExampleTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
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
            </Col>
        </div>
    )
}

export default WordCard
