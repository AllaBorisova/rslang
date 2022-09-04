/* eslint-disable no-constant-condition */
/* eslint-disable no-await-in-loop */
import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import ToggleButton from '../UI/ToggleButton'
import ToggleMute from '../UI/ToggleMute'
import './AudiocallGame.scss'
import Loading from '../Loading'
import DifficultiesScreen from '../GameComponents/DifficultiesScreen'
import FinishStat from '../GameComponents/FinishStat'

function AudiocallGame() {
    const { state } = useLocation()
    // console.log(state)
    const score = false
    function randomInteger(min, max) {
        const rand = min - 0.5 + Math.random() * (max - min + 1)
        return Math.round(rand)
    }
    function makeRandomArr(a, b) {
        return Math.random() - 0.5
    }
    const correctAnswer = useRef()
    const allButtons = useRef()
    const [counter, setCounter] = useState(5)
    const game = 'Аудиовызов'
    const [level, setLevel] = useState(state?.value || null)
    const [currentWord, setCurrentWord] = useState(null)
    const [cards, setCards] = useState([])
    const [endGame, setEndGame] = useState(false)
    const [startGame, setStartGame] = useState(true)
    const [playing, setPlaying] = useState(!!state)
    const [rightAnswers, setRightAnswers] = useState([])
    const [wrongAnswers, setWrongAnswers] = useState([])
    const startGameEvent = (e) => {
        setLevel(e.target.dataset.level)
        setPlaying(true)
        setEndGame(false)
    }
    const restartGameEvent = () => {
        setStartGame(true)
        setPlaying(false)
        setEndGame(false)
    }
    useEffect(() => {
        const getList = async () => {
            const allWords = []
            for (let i = 0; i < (state?.page || 30); i += 1) {
                const res = await axios
                    .get(`https://teamwork-rs.herokuapp.com/words?group=${level}&page=${i}`)
                    .then((resp) => resp.data)
                allWords.push(...res)
            }
            setCards(allWords)
        }
        if (level !== null) {
            getList()
        }
    }, [level, state])
    useEffect(() => {
        setCurrentWord(cards[randomInteger(0, cards.length - 1)])
    }, [cards])

    useEffect(() => {
        if (counter === 0) {
            setEndGame(true)
            setPlaying(false)
        }
    }, [counter])

    if (!playing && !endGame && !state) {
        return <DifficultiesScreen action={startGameEvent} game={game} />
    }
    if (!cards.length || !currentWord) {
        return <Loading />
    }
    const wrong1 = cards[randomInteger(0, cards.length - 1)].wordTranslate

    const wrong2 = cards[randomInteger(0, cards.length - 1)].wordTranslate
    const wrong3 = cards[randomInteger(0, cards.length - 1)].wordTranslate
    const translations = [currentWord.wordTranslate, wrong1, wrong2, wrong3]

    const finalTranslations = translations.sort(makeRandomArr)
    const handleClick = (e) => {
        if (e.target.textContent === currentWord.wordTranslate) {
            e.target.classList.add('correct')
        } else {
            correctAnswer.current.classList.add('correct')
            e.target.classList.add('wrong')
        }
        setTimeout(() => {
            allButtons.current.childNodes.forEach((el) => {
                el.classList.remove('wrong')
                el.classList.remove('correct')
            })
            setRightAnswers((oldArray) => [...oldArray, currentWord])
            setCurrentWord(cards[randomInteger(0, cards.length - 1)])
            setWrongAnswers((oldArray) => [...oldArray, currentWord])
            setCounter(counter - 1)
            if (counter === 0) {
                setEndGame(true)
            }
        }, 1000)
    }
    const handleFinishClick = () => {
        setPlaying(false)
        setEndGame(true)
    }

    return (
        <div>
            {playing && (
                <div>
                    <ToggleMute />
                    <ToggleButton />
                    <div className="hearts">
                        <p>lives x{counter}</p>
                        <img alt="heart" src="https://img.icons8.com/emoji/256/red-heart.png" />
                    </div>
                    <audio controls src={`https://teamwork-rs.herokuapp.com/${currentWord.audio}`}>
                        <track default kind="captions" srcLang="en" />
                    </audio>
                    <div ref={allButtons}>
                        <button
                            type="button"
                            onClick={handleClick}
                            ref={finalTranslations[0] === currentWord.wordTranslate ? correctAnswer : null}
                        >
                            {finalTranslations[0]}
                        </button>
                        <button
                            type="button"
                            onClick={handleClick}
                            ref={finalTranslations[1] === currentWord.wordTranslate ? correctAnswer : null}
                        >
                            {finalTranslations[1]}
                        </button>
                        <button
                            type="button"
                            onClick={handleClick}
                            ref={finalTranslations[2] === currentWord.wordTranslate ? correctAnswer : null}
                        >
                            {finalTranslations[2]}
                        </button>
                        <button
                            type="button"
                            onClick={handleClick}
                            ref={finalTranslations[3] === currentWord.wordTranslate ? correctAnswer : null}
                        >
                            {finalTranslations[3]}
                        </button>
                        <button type="button" onClick={handleClick}>
                            не знаю
                        </button>
                    </div>
                    <button type="button" onClick={handleFinishClick}>
                        закончить досрочно
                    </button>
                </div>
            )}
            {endGame && (
                <FinishStat
                    score={score}
                    rightAnswers={rightAnswers}
                    wrongAnswers={wrongAnswers}
                    handleClickRestart={restartGameEvent}
                />
            )}
        </div>
    )
}

export default AudiocallGame
