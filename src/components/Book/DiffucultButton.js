import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
// import GetDiffWords from './GetDifficultWords'

function DifficultButton({ user }) {
    if (user) {
        return (
            <Link to="/dictionary/" params={user}>
                <div>
                    <Button
                        as="input"
                        type="submit"
                        variant="secondary"
                        value="Difficult"
                        data-transfer="6"
                        onClick={() => console.log('hi')}
                    />{' '}
                </div>
            </Link>
        )
    }
    return (
        <div>
            <Button as="input" type="submit" variant="secondary" value="Difficult" data-transfer="6" disabled />{' '}
        </div>
    )
}

export default DifficultButton
