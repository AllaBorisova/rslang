import React from 'react'
import ReactPaginate from 'react-paginate'
import WordCard from './WordCard'
import '../../styles/App.scss'

function WordsPage({ words, loading }) {
    // console.log(words)
    // console.log(loading)
    const handlePageClick = (data) => {
        console.log(data)
    }
    if (loading) {
        return <h3>Loading...</h3>
    }
    return (
        <div>
            <ReactPaginate
                previousLabel="Prev"
                nextLabel="Next"
                breakLabel="..."
                pageCount={20}
                MarginPages={5}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                pageClassName="page-item"
            />

            <ul>
                {words.map((item) => (
                    <li className="group-words" key={item.id}>
                        <WordCard props={item} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default WordsPage
