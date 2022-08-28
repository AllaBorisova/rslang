import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';

import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Loading from '../components/Loading';

const TIME_LIMIT = 20000;

const Questions = ({ children }) => <div>{children}</div>;
const Score = ({ value }) => <h3>{`Счет: ${value}`}</h3>;

function Question({ originalWord, onAnswerRight, onAnswerWrong, really, otherWord, sprintScore }) {
    return (
        <>
            <Row className="p-2">
                <Col>
                    <h3>{originalWord.word}</h3>
                    <h4>{otherWord.wordTranslate}</h4>
                </Col>
            </Row>
            <Row className="p-2">
                <Col>
                    {really && (
                        <>
                            {' '}
                            <ButtonGroup>
                                <Button variant="success" onClick={() => onAnswerRight(sprintScore, originalWord)}>
                                    Верно
                                </Button>
                                <Button variant="danger" onClick={() => onAnswerWrong(originalWord)}>
                                    Неверно
                                </Button>
                            </ButtonGroup>
                        </>
                    )}
                    {!really && (
                        <>
                            {' '}
                            <ButtonGroup>
                                <Button variant="success" onClick={() => onAnswerWrong(otherWord)}>
                                    Верно
                                </Button>
                                <Button variant="danger" onClick={() => onAnswerRight(sprintScore, otherWord)}>
                                    Неверно
                                </Button>
                            </ButtonGroup>
                        </>
                    )}
                </Col>
            </Row>
        </>
    );
}

const Timer = ({ time, interval = 1000, onEnd }) => {
    const [internalTime, setInternalTime] = useState(time);
    const timerRef = useRef(time);
    const timeRef = useRef(time);
    useEffect(() => {
        if (internalTime === 0 && onEnd) {
            onEnd();
        }
    }, [internalTime, onEnd]);
    useEffect(() => {
        timerRef.current = setInterval(() => setInternalTime((timeRef.current -= interval)), interval);
        return () => {
            clearInterval(timerRef.current);
        };
    }, [interval]);
    return <div className="fs-3">{`${internalTime / 1000}s`}</div>;
};

const useAudio = (src, volume = 1) => {
    const [audio, setAudio] = useState(null);
    useEffect(() => {
        const AUDIO = new Audio(src);
        AUDIO.volume = volume;
        setAudio(AUDIO);
    }, [src]);
    return {
        play: () => audio.play(),
        pause: () => audio.pause(),
        stop: () => {
            audio.pause();
            audio.currentTime = 0;
        },
    };
};
const usePersistentState = (key, initialValue) => {
    const [state, setState] = useState(
        window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key)) : initialValue
    );
    useEffect(() => {
        window.localStorage.setItem(key, state);
    }, [key, state]);
    return [state, setState];
};

const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
};

const Game = () => {
    //audio
    const { play: playAudioRight } = useAudio('../public/audio/right.mp3');
    const { play: playAudioWrong } = useAudio('../public/audio/wrong.mp3');
    const [muted, setMuted] = usePersistentState('muted', true);
    const toggleMute = () => {
        setMuted(!muted);
    };

    const [sprintScore, setSprintScore] = useState(10);

    const [playing, setPlaying] = useState(false);
    const [finished, setFinished] = useState(false);
    const [score, setScore] = useState(0);
    let [counterArray, setCounterArray] = useState(0);
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [level, setLevel] = useState(1);
    const [pageNumber, setPageNumber] = useState(Math.floor(Math.random() * 30));

    const [answersBonus, setAnswersBonus] = useState(0);

    const [rightAnswers, setRightAnswers] = useState([]);
    const [wrongAnswers, setWrongAnswers] = useState([]);

    const onAnswerRight = (points, word) => {
        if (!muted) {
            playAudioRight();
        }
        setCounterArray((counterArray + 1) % 20);
        setScore(score + points);
        setAnswersBonus(answersBonus + 1);
        setRightAnswers((oldArray) => [...oldArray, word]);
        if (answersBonus === 3) {
            setSprintScore(sprintScore + 10);
            setAnswersBonus(0);
        }
        console.log('rightAnswers', rightAnswers);
        // setPageNumber(Math.floor( Math.random() * 30))
    };
    const onAnswerWrong = (word) => {
        if (!muted) {
            playAudioWrong();
        }
        setCounterArray((counterArray + 1) % 20);
        setScore(score);
        setSprintScore(10);
        setAnswersBonus(0);
        setWrongAnswers((oldArray) => [...oldArray, word]);
        // setPageNumber(Math.floor( Math.random() * 30))
        console.log('wrongAnswers', wrongAnswers);
    };

    useEffect(() => {
        const getList = async () => {
            setLoading(true);
            const res1 = await axios.get( `https://teamwork-rs.herokuapp.com/words?group=${ level }&page=${ pageNumber }` );
            // const res2 = await axios.get( `https://teamwork-rs.herokuapp.com/words?group=${ level }&page=${ pageNumber }` );
            // const res3 = await axios.get(`https://teamwork-rs.herokuapp.com/words?group=${level}&page=${pageNumber}`);
            // setWords( ( oldArray ) => [ ...oldArray, res1.data, res2.data, res3.data ] );
            setWords(res1.data);
            setLoading(false);
        };
        getList();
    }, [level, pageNumber]);

    const endGame = () => {
        setPlaying(false);
        setFinished(true);
    };

    const startGame = (e) => {
        setLevel(e.target.dataset.level);
        setScore(0);
        setPlaying(true);
        setFinished(false);
    };

    //random
    const really = Math.random() < 0.5 ? true : false;
    const originalWord = words[counterArray];

    let otherWord = originalWord;

    //choose next word
    if (!really) {
        let index = (counterArray + 1) % 20;
        // while (index == counterArray) {
        //     index = Math.floor(Math.random() * words.length);
        //     console.log(index, counterArray);
        //     i++;
        // }
        otherWord = words[index];
    }

    return (
        <div>
            {!playing && !finished && (
                <Row className="p-5 justify-content-md-center text-center">
                    <Col md={6}>
                        <h1>Спринт</h1>
                        <p>Выберите уровень</p>
                        <Button variant="primary" data-level="0" onClick={startGame}>
                            1
                        </Button>{' '}
                        <Button variant="secondary" data-level="1" onClick={startGame}>
                            2
                        </Button>{' '}
                        <Button variant="success" data-level="2" onClick={startGame}>
                            3
                        </Button>{' '}
                        <Button variant="warning" data-level="3" onClick={startGame}>
                            4
                        </Button>{' '}
                        <Button variant="danger" data-level="4" onClick={startGame}>
                            5
                        </Button>{' '}
                        <Button variant="info" data-level="5" onClick={startGame}>
                            6
                        </Button>{' '}
                    </Col>
                </Row>
            )}

            {playing && (
                <>
                    <button className="icon-button" onClick={toggleMute}>
                        {muted && (
                            <>
                                <svg className="icon" viewBox="0 0 512 512" width="100" title="Mute audio">
                                    <path d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z" />
                                </svg>
                            </>
                        )}
                        {!muted && (
                            <>
                                <svg className="icon" viewBox="0 0 576 512" width="100" title="Audio On">
                                    <path d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z" />
                                </svg>
                            </>
                        )}
                    </button>
                    <button className="icon-button" onClick={toggleFullScreen}>
                        <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path>
                        </svg>
                    </button>
                    <Row className="justify-content-md-center">
                        <Col md={4} className="p-5 mb-4 bg-light rounded-3 text-center">
                            <Score value={score} />
                            <h4>+{sprintScore} очков</h4>
                            <div className="dots p-2">
                                {answersBonus >= 1 ? (
                                    <div className="dot dot1 active"></div>
                                ) : (
                                    <div className="dot dot1"></div>
                                )}
                                {answersBonus >= 2 ? (
                                    <div className="dot dot2 active"></div>
                                ) : (
                                    <div className="dot dot2"></div>
                                )}
                                {answersBonus >= 3 ? (
                                    <div className="dot dot3 active"></div>
                                ) : (
                                    <div className="dot dot3"></div>
                                )}
                            </div>
                            {/* <Questions>
                                <div className="group-words"> */}
                            <Question
                                originalWord={originalWord}
                                onAnswerRight={onAnswerRight}
                                onAnswerWrong={onAnswerWrong}
                                really={really}
                                otherWord={otherWord}
                                sprintScore={sprintScore}
                            />
                            {/* </div>
                            </Questions> */}
                            <Row>
                                <Col>
                                    <Timer time={TIME_LIMIT} onEnd={endGame} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </>
            )}
            {finished && (
                <Row className="justify-content-md-center">
                    <Col md={4} className="p-5 mb-4 bg-light rounded-3 text-center">
                        <h2>Результаты</h2>
                        <Score value={score} />
                        <h3>
                            Правильные ответы <Badge bg="success">{rightAnswers.length}</Badge>
                        </h3>
                        <Table striped>
                            <tbody>
                                {rightAnswers.map((element, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{element.word}</td>
                                            <td>{element.transcription}</td>
                                            <td>{element.wordTranslate}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        <h3>
                            Ошибки <Badge bg="danger">{wrongAnswers.length}</Badge>
                        </h3>
                        <Table striped>
                            <tbody>
                                {wrongAnswers.map((element, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{element.word}</td>
                                            <td>{element.transcription}</td>
                                            <td>{element.wordTranslate}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        {/* <Button variant="info" onClick={onRestart}>Play Again</Button> */}
                        {/* <button onClick={onRestart}>Play Again</button> */}
                    </Col>
                </Row>
            )}
        </div>
    );
};

function Sprint() {
    return (
        <section className="my-4">
            <Container>
                <Game />
            </Container>
        </section>
    );
}
export default Sprint;
