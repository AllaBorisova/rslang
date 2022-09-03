import React from 'react'

import Button from 'react-bootstrap/Button'

function Group(props) {
    const { action, reset } = props
    const handleChange = (event) => {
        action(event.target.dataset.transfer)
        reset(0)
    }
    return (
        <div className="group-btn">
            <Button
                as="input"
                type="submit"
                variant="info"
                value="A 1"
                data-transfer="0"
                active={false}
                onClick={handleChange}
            />{' '}
            <Button as="input" type="submit" variant="warning" value="A 2" data-transfer="1" onClick={handleChange} />{' '}
            <Button as="input" type="submit" variant="success" value="B 1" data-transfer="2" onClick={handleChange} />{' '}
            <Button as="input" type="submit" variant="primary" value="B 2" data-transfer="3" onClick={handleChange} />{' '}
            <Button as="input" type="submit" variant="dark" value="C 1" data-transfer="4" onClick={handleChange} />{' '}
            <Button as="input" type="submit" variant="danger" value="C 2" data-transfer="5" onClick={handleChange} />{' '}
        </div>
    )
}

export default Group
