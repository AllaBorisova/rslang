import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Group from '../components/Book/Group'
import Pagination from '../components/Book/Pagination'
import WordsPage from '../components/Book/WordsPage'

function Textbook() {
    const BASE_URL = `https://teamwork-rs.herokuapp.com/words?`
    const [value, setValue] = useState('0')
    const [pageNumber, setPageNumber] = useState(0)
    const changePage = ({ selected }) => setPageNumber(selected)
    const [words, setWords] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getList = async () => {
            setLoading(true)

            const res = await axios.get(`${BASE_URL}group=${value}&page=${pageNumber}`)
            setWords(res.data)
            setLoading(false)
        }
        getList()
    }, [value, pageNumber, BASE_URL])
    return (
        <section className="textbook-main">
            <h1>Textbook</h1>
            <Group action={setValue} />
            <Pagination action={changePage} />
            <div className="word-wrapper">
                <WordsPage words={words} loading={loading} props={value} />
            </div>
            <Pagination action={changePage} />
        </section>
    )
}

export default Textbook
