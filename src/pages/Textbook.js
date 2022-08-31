import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Group from '../components/Book/Group'
import Pagination from '../components/Book/Pagination'
import WordsPage from '../components/Book/WordsPage'
import useToken from '../components/Auth/UseToken'

function Textbook () {
    const { token, setToken, logout, userId } = useToken()
    console.log( token );
    console.log( userId );

    const BASE_URL = `https://teamwork-rs.herokuapp.com/words?`
    const [value, setValue] = useState(
        sessionStorage.getItem('page') ? JSON.parse(sessionStorage.getItem('page')).value : '0'
    )
    const [pageNumber, setPageNumber] = useState(
        sessionStorage.getItem('page') ? JSON.parse(sessionStorage.getItem('page')).pageNumber : 0
    )
    const [words, setWords] = useState([])
    const [loading, setLoading] = useState(false)
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('page', JSON.stringify({ pageNumber, value }))
    })
    useEffect(() => {
        const getList = async () => {
            setLoading(true)
            const res = await axios.get(`${BASE_URL}group=${value}&page=${pageNumber}`)
            setWords(res.data)
            setLoading(false)
        }
        getList()
    }, [value, pageNumber, BASE_URL])

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    return (
        <section className="textbook-main">
            <h1>Textbook</h1>
            <Group action={setValue} reset={setPageNumber} />
            <Pagination action={changePage} current={pageNumber} />
            <div className="word-wrapper">
                <WordsPage words={words} loading={loading} props={value} />
            </div>
            <Pagination action={changePage} />
        </section>
    )
}

export default Textbook
