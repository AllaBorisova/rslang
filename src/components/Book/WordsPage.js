import React from 'react'
import ReactPaginate from 'react-paginate'
import WordCard from './WordCard'
import '../../styles/App.scss'

function WordsPage({ words, loading }) {
    const handlePageClick = (data) => {
        console.log(data.selected)
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
                        <WordCard
                            image={item.image}
                            word={item.word}
                            transc={item.transcription}
                            translate={item.wordTranslate}
                            examp={item.textExample}
                            examptrans={item.textExampleTranslate}
                            meaning={item.textMeaning}
                            examplmeaning={item.textMeaningTranslate}
                            audio1={item.audio1}
                            audio2={item.audioExample}
                            audio3={item.audioMeaning}
                            id={item.id}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default WordsPage
