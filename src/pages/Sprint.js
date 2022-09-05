import React from 'react'
import Container from 'react-bootstrap/Container'
import Game from '../components/Sprint/Game'

function Sprint() {
    return (
        <section className="py-4 game-section full-section">
            <Container>
                <Game />
            </Container>
        </section>
    )
}
export default Sprint
