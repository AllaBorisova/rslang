import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import Button from 'react-bootstrap/Button'
import WordsPage from './WordsPage'

function Group() {
    const BASE_URL = `https://teamwork-rs.herokuapp.com/words?`
    const pageCount = 30
    const [value, setValue] = useState('0')
    const [words, setWords] = useState([])
    const [loading, setLoading] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const changePage = ({ selected }) => setPageNumber(selected)
    useEffect(() => {
        const getList = async () => {
            setLoading(true)
            const res = await axios.get(`${BASE_URL}group=${value}&page=${pageNumber}`)
            setWords(res.data)
            setLoading(false)
        }
        getList()
    }, [value, pageNumber, BASE_URL])
    const handleChange = (event) => {
        setValue(event.target.dataset.transfer)
    }
    return (
        <>
            <div className="group-btn">
                <Button as="input" type="submit" variant="info" value="A 1" data-transfer="0" onClick={handleChange} />{' '}
                <Button
                    as="input"
                    type="submit"
                    variant="warning"
                    value="A 2"
                    data-transfer="1"
                    onClick={handleChange}
                />{' '}
                <Button
                    as="input"
                    type="submit"
                    variant="success"
                    value="B 1"
                    data-transfer="2"
                    onClick={handleChange}
                />{' '}
                <Button
                    as="input"
                    type="submit"
                    variant="primary"
                    value="B 2"
                    data-transfer="3"
                    onClick={handleChange}
                />{' '}
                <Button as="input" type="submit" variant="dark" value="C 1" data-transfer="4" onClick={handleChange} />{' '}
                <Button
                    as="input"
                    type="submit"
                    variant="danger"
                    value="C 2"
                    data-transfer="5"
                    onClick={handleChange}
                />{' '}
                <Button as="input" type="submit" variant="secondary" value="Difficult" data-transfer="6" disabled />{' '}
            </div>
            <div className="group-btn">
                <ReactPaginate
                    previousLabel="Previous"
                    nextLabel="Next"
                    pageCount={pageCount}
                    siblingCount="1"
                    onPageChange={changePage}
                    containerClassName="pagination"
                    previousLinkClassName="previous-btn"
                    nextLinkClassName="next-btn"
                    disabledClassName="disabled-btn"
                    activeClassName="active-btn"
                    pageRangeDisplayed={5}
                />
            </div>
            <div className="word-wrapper">
                <WordsPage words={words} loading={loading} props={value} />
            </div>
            <div className="group-btn">
                <ReactPaginate
                    previousLabel="Previous"
                    nextLabel="Next"
                    pageCount={pageCount}
                    siblingCount="1"
                    onPageChange={changePage}
                    containerClassName="pagination"
                    previousLinkClassName="previous-btn"
                    nextLinkClassName="next-btn"
                    disabledClassName="disabled-btn"
                    activeClassName="active-btn"
                    pageRangeDisplayed={5}
                />
            </div>
        </>
    )
}

export default Group
