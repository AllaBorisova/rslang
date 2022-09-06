import React, { useEffect, useRef, useState } from 'react'
import ButtonSound from './ButtonSound'

function Player({ sound }) {
    const [currentSound, SetCurrentIndex] = useState(0)
    const [isSound, setIsSound] = useState(false)
    const soundItem = useRef(0)
    function HandleEnded() {
        if (currentSound + 1 > sound.length - 1) {
            setIsSound(false)
            return SetCurrentIndex(0)
        }
        return SetCurrentIndex(currentSound + 1)
    }

    useEffect(() => {
        if (isSound) {
            soundItem.current.play()
        } else {
            soundItem.current.pause()
        }
    })

    return (
        <div className="player-block">
            <div className="player">
                <audio className="player__audio" src={sound[currentSound].src} ref={soundItem} onEnded={HandleEnded}>
                    <track default kind="captions" srcLang="en" />
                </audio>
            </div>
            <div className="player__button">
                <ButtonSound isSound={isSound} setIsSound={setIsSound} />
            </div>
        </div>
    )
}

export default Player
