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

    //    useEffect(()=>{
    //      const audio = document.querySelector('.player__audio')
    //    },[])

    // audio.addEventListener('ended', () => {
    //     console.log('hi"')
    //     // if (sound[currentSound].src.duration === sound[currentSound].src.currentTime) {
    //     //     sound[currentSound].src.play()
    //     // }
    // })

    return (
        <>
            <div className="player">
                <audio
                    className="player__audio"
                    src={sound[currentSound].src}
                    ref={soundItem}
                    onEnded={() => SetCurrentIndex(nextSound)}
                >
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
