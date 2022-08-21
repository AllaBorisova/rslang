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
    }, [value, page])

    const handleChange = (event) => setValue(event.target.value)
    return (
        <>
            <div>
                <Button as="input" type="submit" value="0" onClick={handleChange} />{' '}
                <Button as="input" type="submit" value="1" onClick={handleChange} />{' '}
                <Button as="input" type="submit" value="2" onClick={handleChange} />{' '}
                <Button as="input" type="submit" value="3" onClick={handleChange} />{' '}
                <Button as="input" type="submit" value="4" onClick={handleChange} />{' '}
                <Button as="input" type="submit" value="5" onClick={handleChange} />{' '}
                <Button as="input" type="submit" value="6" onClick={handleChange} />{' '}
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
