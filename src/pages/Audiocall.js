import React from 'react'
import Container from 'react-bootstrap/Container'
import AudiocallGame from '../components/AudiocallGame/AudiocallGame'

function Audiocall() {
    return (
        <section className="py-4 game-section full-section">
            <Container>
                <AudiocallGame />
            </Container>
        </section>
    )
}

export default Audiocall
