import React from 'react'
import { NavLink } from 'react-router-dom'
// import Pagination from '../components/Book/Pagination'
import WordsPage from '../components/Book/WordsPage'
import GetDiffWords from '../components/Book/GetDifficultWord'
import GetStorage from '../components/Book/LocalStorage'

function Dictionary() {
    const user = GetStorage('userData', {})[0]
    if (!user) {
        return null
    }
    const list = GetDiffWords(user)[0]
    return (
        <>
            <div>
                <h1>Difficult</h1>
            </div>
            <NavLink to="/textbook">Вернуться к учебнику</NavLink>
            <WordsPage words={list} props="0" user={user} dict />
        </>
    )
}

export default Dictionary
