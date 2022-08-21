import React from 'react'

function WordCard({
    id,
    image,
    examp,
    meaning,
    word,
    translate,
    audio1,
    audio2,
    audio3,
    transc,
    examptrans,
    examplmeaning,
}) {
    return (
        <div>
            <img src={image} alt="" />
            <p>{word}</p>
            <p>{transc}</p>
            <p>{translate}</p>
            <p>{examp.replace(/<[^>]+>/g, '')}</p>
            <p>{examptrans.replace(/<[^>]+>/g, '')}</p>
            <p>{meaning.replace(/<[^>]+>/g, '')}</p>
            <p>{examplmeaning.replace(/<[^>]+>/g, '')}</p>
            <audio>
                <track kind="captions" src={audio1} />
            </audio>
            <audio>
                <track kind="captions" src={audio2} />
            </audio>
            <audio>
                <track kind="captions" src={audio3} />
            </audio>
            <div className="btn-card-control">
                <button type="button" className="btn-add" value={id}>
                    Добавить в сложные
                </button>
                <button type="button" className="btn-remove" value={id}>
                    Удалить
                </button>
            </div>
        </div>
    )
}

export default WordCard
