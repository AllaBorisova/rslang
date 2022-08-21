import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import WordsPage from './WordsPage'

function Group() {
    const BASE_URL = `https://teamwork-rs.herokuapp.com/words?`
    const [value, setValue] = useState('0')
    const [words, setWords] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    useEffect(() => {
        const getList = async () => {
            setLoading(true)
            const res = await axios.get(`${BASE_URL}group=${value}&pages=${page}`)
            setWords(res.data)
            setLoading(false)
        }
        getList()
    }, [value, page, BASE_URL])

    const handleChange = (event) => setValue(event.target.dataset.transfer)
    return (
        <>
            <div>
                <Button as="input" type="submit" value="Level 1" data-transfer="0" onClick={handleChange} />{' '}
                <Button as="input" type="submit" value="Level 2" data-transfer="1" onClick={handleChange} />{' '}
                <Button as="input" type="submit" value="Level 3" data-transfer="2" onClick={handleChange} />{' '}
                <Button as="input" type="submit" value="Level 4" data-transfer="3" onClick={handleChange} />{' '}
                <Button as="input" type="submit" value="Level 5" data-transfer="4" onClick={handleChange} />{' '}
                <Button as="input" type="submit" value="Level 6" data-transfer="5" onClick={handleChange} />{' '}
                <Button as="input" type="submit" value="Level 7" data-transfer="6" disabledonClick={handleChange} />{' '}
            </div>
            <div>
                <div>
                    <WordsPage words={words} loading={loading} />
                </div>
            </div>
        </>
    )
}

export default Group
