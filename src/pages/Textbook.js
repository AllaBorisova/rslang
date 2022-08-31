import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Group from '../components/Book/Group'
import Pagination from '../components/Book/Pagination'
import WordsPage from '../components/Book/WordsPage'
import DifficultButton from '../components/Book/DiffucultButton'
import GetStorage from '../components/Book/LocalStorage'

function Textbook() {
    const BASE_URL = `https://teamwork-rs.herokuapp.com/words?`
    const [user, setUser] = GetStorage('userData', '')

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
            <section className="group-btn">
                <Group action={setValue} reset={setPageNumber} />
                <DifficultButton user={user} />
            </section>
            <Pagination action={changePage} current={pageNumber} />
            <div className="word-wrapper">
                <WordsPage words={words} loading={loading} props={value} user={user} dict={false} />
            </div>
            <Pagination action={changePage} />
        </section>
    )
}

export default Textbook
