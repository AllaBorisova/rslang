import React, { useEffect, useRef, useState } from 'react'
import ButtonSound from './ButtonSound'

function Player(props) {
    const { sound, currentSound, SetCurrentIndex, nextSound } = props
    const soundItem = useRef(0)
    const [isSound, setIsSound] = useState(false)
    useEffect(() => {
        if (isSound) {
            soundItem.current.play()
        } else {
            soundItem.current.pause()
        }
    })

    return (
        <>
            <div className="player">
                <audio className="player__audio" src={sound[currentSound].src} ref={soundItem}>
                    <track default kind="captions" srcLang="en" />
                </audio>
            </div>
            <div className="player__button">
                <ButtonSound isSound={isSound} setIsSound={setIsSound} />
            </div>
        </>
    )
}

export default Player
