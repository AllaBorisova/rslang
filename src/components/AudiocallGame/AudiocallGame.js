/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ToggleButton from '../UI/ToggleButton'
import ToggleMute from '../UI/ToggleMute'
import './AudiocallGame.scss'
import Loading from '../Loading'
import DifficultiesScreen from '../GameComponents/DifficultiesScreen'
import FinishStat from '../GameComponents/FinishStat'

function AudiocallGame() {
    const score = false
    function randomInteger(min, max) {
        const rand = min - 0.5 + Math.random() * (max - min + 1)
        return Math.round(rand)
    }
    function makeRandomArr(a, b) {
        return Math.random() - 0.5
    }
    const [counter, setCounter] = useState(5)
    const game = 'Аудиовызов'
    const [level, setLevel] = useState(null)
    const [currentWord, setCurrentWord] = useState(null)
    const [cards, setCards] = useState([])
    const [endGame, setEndGame] = useState(false)
    const [startGame, setStartGame] = useState(true)
    const [playing, setPlaying] = useState(false)
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
            for (let i = 0; i < 30; i += 1) {
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
    }, [level])
    useEffect(() => {
        setCurrentWord(cards[randomInteger(0, 599)])
    }, [cards])

    useEffect(() => {
        if (counter === 0) {
            setEndGame(true)
            setPlaying(false)
        }
    }, [counter])

    if (!playing && !endGame) {
        return <DifficultiesScreen action={startGameEvent} game={game} />
    }
    if (!cards.length || !currentWord) {
        return <Loading />
    }
    const wrong1 = cards[randomInteger(0, 599)].wordTranslate
    const wrong2 = cards[randomInteger(0, 599)].wordTranslate
    const wrong3 = cards[randomInteger(0, 599)].wordTranslate
    const translations = [currentWord.wordTranslate, wrong1, wrong2, wrong3]
    const finalTranslations = translations.sort(makeRandomArr)
    const handleClick = (e) => {
        if (e.target.textContent === currentWord.wordTranslate) {
            setRightAnswers((oldArray) => [...oldArray, currentWord])
        } else {
            setWrongAnswers((oldArray) => [...oldArray, currentWord])
            setCounter(counter - 1)
            if (counter === 0) {
                setEndGame(true)
            }
        }
        setCurrentWord(cards[randomInteger(0, 599)])
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
                    <div>
                        <button type="button" onClick={handleClick}>
                            {finalTranslations[0]}
                        </button>
                        <button type="button" onClick={handleClick}>
                            {finalTranslations[1]}
                        </button>
                        <button type="button" onClick={handleClick}>
                            {finalTranslations[2]}
                        </button>
                        <button type="button" onClick={handleClick}>
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
