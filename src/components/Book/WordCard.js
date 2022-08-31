import React, { useEffect, useState } from 'react'
import '../../styles/WordCard.scss'
import ButtonGroup from './ButtonGroup'
import Player from './Player'

function WordCard(props) {
    // console.log(items)
    const { items, user, dict } = props
    const { userId } = user
    const img = `https://teamwork-rs.herokuapp.com/${items.image}`
    const audio = `https://teamwork-rs.herokuapp.com/${items.audio}`
    const audioMeaning = `https://teamwork-rs.herokuapp.com/${items.audioMeaning}`
    const audioExample = `https://teamwork-rs.herokuapp.com/${items.audioExample}`
    // Player
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
                    <Player
                        currentSound={currentSound}
                        SetCurrentIndex={SetCurrentIndex}
                        nextSound={nextSound}
                        sound={sound}
                    />
                    {/* <audio controls src={audio}>
                        <track default kind="captions" srcLang="en" />
                    </audio> */}
                </div>

                <div className="wordCard__example">
                    <p>{textMeaning.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                    <p>{textMeaningTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                    {/* <audio controls src={audioMeaning}>
                        <track default kind="captions" srcLang="en" />
                    </audio> */}
                </div>

                <div className="wordCard__example">
                    <p>{textExample.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                    <p>{textExampleTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                    {/* <audio controls src={audioExample}>
                        <track default kind="captions" srcLang="en" />
                    </audio> */}
                </div>
            </div>
        )
    }
    // console.log(items._id)
    // const newId = items._id
    // const bookId= items.id
    let ourId = id
    if (dict) {
        // eslint-disable-next-line no-underscore-dangle
        ourId = items._id
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
                <Player
                    currentSound={currentSound}
                    SetCurrentIndex={SetCurrentIndex}
                    nextSound={nextSound}
                    sound={sound}
                />
                {/* <audio controls src={audio}>
                    <track default kind="captions" srcLang="en" />
                </audio> */}
            </div>

            <div className="wordCard__example">
                <p>{textMeaning.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                <p>{textMeaningTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                {/* <audio controls src={audioMeaning}>
                    <track default kind="captions" srcLang="en" />
                </audio> */}
            </div>

            <div className="wordCard__example">
                <p>{textExample.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                <p>{textExampleTranslate.replace(/<\/?[a-z][^>]*(>|$)/gi, '')}</p>
                {/* <audio controls src={audioExample}>
                    <track default kind="captions" srcLang="en" />
                </audio> */}
            </div>
            <ButtonGroup id={ourId} user={user} dict={dict} />
        </div>
    )
}

export default WordCard
