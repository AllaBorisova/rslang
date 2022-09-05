/* eslint-disable no-constant-condition */
/* eslint-disable no-await-in-loop */
import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/esm/Button'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import ToggleButton from '../UI/ToggleButton'
import ToggleMute from '../UI/ToggleMute'
import './AudiocallGame.scss'
import Loading from '../Loading'
import DifficultiesScreen from '../GameComponents/DifficultiesScreen'
import FinishStat from '../GameComponents/FinishStat'
import Hearts from './Hearts'
import usePersistentState from '../../hooks/usePersistentState'
import useAudio from '../../hooks/useAudio'
import { changeUserWord, createUserWord, getUserWord } from '../Auth/ApiUser'
import useToken from '../Auth/UseToken'

function AudiocallGame() {
    const { state } = useLocation()
    const { token, userId } = useToken()
    const score = false
    function randomInteger(min, max) {
        const rand = min - 0.5 + Math.random() * (max - min + 1)
        return Math.round(rand)
    }
    function makeRandomArr() {
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
    const [playing, setPlaying] = useState(!!state)
    const [rightAnswers, setRightAnswers] = useState([])
    const [wrongAnswers, setWrongAnswers] = useState([])

    const { play: playAudioRight } = useAudio('../public/audio/right.mp3')
    const { play: playAudioWrong } = useAudio('../public/audio/wrong.mp3')

    const [muted, setMuted] = usePersistentState('muted', true)
    const toggleMute = () => {
        setMuted(!muted)
    }
    const startGameEvent = (e) => {
        setLevel(e.target.dataset.level)
        setPlaying(true)
        setEndGame(false)
    }
    const restartGameEvent = () => {
        if (!state) {
            setPlaying(false)
        } else {
            setPlaying(true)
        }
        setCounter(5)
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
        if (endGame) {
            const postList = async () => {
                await axios.get(`https://teamwork-rs.herokuapp.com/words`).then((resp) => resp.data)
            }
            postList()
        }
    }, [endGame])
    useEffect(() => {
        if (counter === 0) {
            setEndGame(true)
            setPlaying(false)
        }
    }, [counter])
    useEffect(() => {
        allButtons.current?.childNodes?.forEach((el) => {
            el.classList?.remove('btn-danger')
            el.classList?.remove('btn-success')
            el.classList?.remove('btn-light')
            if (el.classList) {
                el.blur()
            }
        })
    }, [currentWord])
    const calculation = useMemo(() => {
        if (!cards.length || !currentWord) {
            return []
        }
        const wrong1 = cards[randomInteger(0, cards.length - 1)].wordTranslate

        const wrong2 = cards[randomInteger(0, cards.length - 1)].wordTranslate
        const wrong3 = cards[randomInteger(0, cards.length - 1)].wordTranslate
        const translations = [currentWord.wordTranslate, wrong1, wrong2, wrong3]
        const finalTranslations = translations.sort(makeRandomArr)
        return finalTranslations
    }, [currentWord, cards])
    if (!playing && !endGame && !state) {
        return <DifficultiesScreen action={startGameEvent} game={game} />
    }
    if (!cards.length || !currentWord) {
        return (
            <div>
                <Row className="justify-content-center">
                    <Loading />
                </Row>
            </div>
        )
    }

    const handleClick = (e) => {
        if (e.target.textContent === currentWord.wordTranslate) {
            if (!muted) {
                playAudioRight()
            }

            e.target.classList.add('btn-success')
        } else if (!muted) {
            playAudioWrong()
            correctAnswer.current.classList.add('btn-success')
            e.target.classList.add('btn-danger')
        }
        setTimeout(async () => {
            setCurrentWord(cards[randomInteger(0, cards.length - 1)])
            if (e.target.textContent === currentWord.wordTranslate) {
                if (token) {
                    const res = await getUserWord(userId, currentWord.id, token)
                    // console.log(res)
                    if (res === false) {
                        const optional = {
                            audiocall: {
                                wrong: 0,
                                correct: 1,
                            },
                            sprint: {
                                wrong: 0,
                                correct: 0,
                            },
                        }
                        await createUserWord(userId, currentWord.id, token, optional)
                    } else {
                        const optional = {
                            audiocall: {
                                wrong: `${parseInt(res.optional.audiocall.wrong, 10)}`,
                                correct: `${parseInt(res.optional.audiocall.correct, 10) + 1}`,
                            },
                            sprint: {
                                wrong: `${parseInt(res.optional.sprint.wrong, 10)}`,
                                correct: `${parseInt(res.optional.sprint.correct, 10)}`,
                            },
                        }
                        await changeUserWord(userId, currentWord.id, token, optional)
                    }
                }

                setRightAnswers((oldArray) => [...oldArray, currentWord])
            } else {
                if (token) {
                    const res = await getUserWord(userId, currentWord.id, token)
                    if (res === false) {
                        const optional = {
                            audiocall: {
                                wrong: 1,
                                correct: 0,
                            },
                        }
                        await createUserWord(userId, currentWord.id, token, optional)
                    } else {
                        const optional = {
                            audiocall: {
                                wrong: `${parseInt(res.optional.audiocall.wrong, 10) + 1}`,
                                correct: `${parseInt(res.optional.audiocall.correct, 10)}`,
                            },
                        }
                        await changeUserWord(userId, currentWord.id, token, optional)
                    }
                }
                setWrongAnswers((oldArray) => [...oldArray, currentWord])
                setCounter(counter - 1)
                if (counter === 0) {
                    setEndGame(true)
                }
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
                    <Row>
                        <Col className="d-flex">
                            <ToggleMute muted={muted} toggleMute={toggleMute} />
                            <ToggleButton />
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md={7} className="p-5 mb-4 bg-light rounded-3 text-center">
                            <Hearts counter={counter} />

                            <Row className="p-2" ref={allButtons}>
                                <Col>
                                    <audio
                                        controls
                                        src={`https://teamwork-rs.herokuapp.com/${currentWord.audio}`}
                                        autoPlay
                                    >
                                        <track default kind="captions" srcLang="en" />
                                    </audio>
                                </Col>
                            </Row>
                            <Row className="p-2">
                                <Col ref={allButtons}>
                                    <Button
                                        variant="light"
                                        onClick={handleClick}
                                        ref={calculation[0] === currentWord.wordTranslate ? correctAnswer : null}
                                    >
                                        {calculation[0]}
                                    </Button>{' '}
                                    <Button
                                        variant="light"
                                        onClick={handleClick}
                                        ref={calculation[1] === currentWord.wordTranslate ? correctAnswer : null}
                                    >
                                        {calculation[1]}
                                    </Button>{' '}
                                    <Button
                                        variant="light"
                                        onClick={handleClick}
                                        ref={calculation[2] === currentWord.wordTranslate ? correctAnswer : null}
                                    >
                                        {calculation[2]}
                                    </Button>{' '}
                                    <Button
                                        variant="light"
                                        onClick={handleClick}
                                        ref={calculation[3] === currentWord.wordTranslate ? correctAnswer : null}
                                    >
                                        {calculation[3]}
                                    </Button>{' '}
                                    <Button variant="light" onClick={handleClick}>
                                        не знаю
                                    </Button>{' '}
                                </Col>
                            </Row>
                            <Row className="p-2">
                                <Col>
                                    <Button variant="primary" onClick={handleFinishClick}>
                                        закончить досрочно
                                    </Button>{' '}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
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
