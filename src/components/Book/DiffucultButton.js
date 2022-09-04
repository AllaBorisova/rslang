import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

function DifficultButton({ userId }) {
    if (userId) {
        return (
            <Link to="/dictionary">
                <div>
                    <Button as="input" type="submit" variant="secondary" value="Difficult" data-transfer="6" />{' '}
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
