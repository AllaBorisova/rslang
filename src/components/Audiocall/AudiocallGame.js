import React from 'react'
import ToggleButton from '../UI/ToggleButton'
import ToggleMute from '../UI/ToggleMute'
import './AudiocallGame.scss'

function AudiocallGame(words) {
    return (
        <div>
            <ToggleMute />
            <ToggleButton />
            <div className="hearts">
                <p>сердечко</p>
                <p>сердечко</p>
                <p>сердечко</p>
                <p>сердечко</p>
                <p>сердечко</p>
            </div>
            <div>звук</div>
            <div>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
            </div>
        </div>
    )
}

export default AudiocallGame
