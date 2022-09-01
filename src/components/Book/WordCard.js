import React, { useEffect, useState } from 'react'
import '../../styles/WordCard.scss'
import ButtonGroup from './ButtonGroup'
import Player from './Player'
import useToken from '../Auth/UseToken'

function WordCard(props) {
    const [hidden, setHiden] = useState(true)
    const HideTheCard = () => {
        setHiden(false)
    }
    const [hard, setHard] = useState(false)
    const [easy, setEasy] = useState(false)
    const SetHardStyle = () => {
        setHard(true)
        setEasy(false)
    }
    const SetEasyStyle = () => {
        setEasy(true)
        setHard(false)
    }

    const { items, user, dict, currentstyle } = props
    // const { userId } = user
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
    const [currentSound, SetCurrentIndex] = useState(0)
    const [nextSound, SetNextIndex] = useState(0)

    useEffect(() => {
        SetNextIndex(() => {
            if (currentSound + 1 > sound.length - 1) {
                return 0
            }
            return currentSound + 1
        })
    }, [currentSound, sound.length])
    //
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
    if (!token) {
        return (
            <div className="wordCard" style={{ background: currentstyle }}>
                <img src={img} alt={word} />
                <div className="wordCard__word">
                    <div className="wordCard__wordTranscrTransl">
                        <p>{word}</p>
                        <p>{transcription.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                        <p>{wordTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                    </div>
                    <Player
                        currentSound={currentSound}
                        SetCurrentIndex={SetCurrentIndex}
                        nextSound={nextSound}
                        sound={sound}
                    />
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

    let ourId = id
    if (dict) {
        // eslint-disable-next-line no-underscore-dangle
        ourId = items._id
    }

    return (
        <div
            className="wordCard"
            style={{
                background: currentstyle,
                display: hidden ? 'block' : 'none',
                border: hard ? '3px solid red' : '1px solid black',
                boxShadow: easy
                    ? `0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px ${currentstyle}, 0 0 40px ${currentstyle}, 0 0 80px ${currentstyle}`
                    : '',
            }}
        >
            <img src={img} alt={word} />
            <div className="wordCard__word">
                <div className="wordCard__wordTranscrTransl">
                    <p>{word}</p>
                    <p>{transcription.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                    <p>{wordTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                </div>
                <Player
                    currentSound={currentSound}
                    SetCurrentIndex={SetCurrentIndex}
                    nextSound={nextSound}
                    sound={sound}
                />
            </div>

            <div className="wordCard__example">
                <p>{textMeaning.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                <p>{textMeaningTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
            </div>

            <div className="wordCard__example">
                <p>{textExample.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                <p>{textExampleTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
            </div>
            <ButtonGroup id={ourId} user={user} dict={dict} action={[HideTheCard, SetHardStyle, SetEasyStyle]} />
        </div>
    )
}

export default WordCard
