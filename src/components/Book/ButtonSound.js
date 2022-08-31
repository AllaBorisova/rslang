import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function ButtonSound() {
    return (
        <div className="player__button">
            <button type='button' className='soundOn'>
                <FontAwesomeIcon icon="faVolume" />
            </button>
        </div>
    )
}

export default ButtonSound
