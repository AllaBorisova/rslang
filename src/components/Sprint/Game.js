import React, { useEffect, useState } from 'react';
import axios from 'axios';
import usePersistentState from '../../hooks/usePersistentState';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import useAudio from '../../hooks/useAudio';
import Question from './Question';
import Timer from './Timer';
import Score from './Score';
import ToggleButton from '../UI/ToggleButton';
import ToggleMute from '../UI/ToggleMute';
import DifficultiesScreen from '../GameComponents/DifficultiesScreen';
import FinishStat from '../GameComponents/FinishStat';
import { createUserWord, getUserWord, changeUserWord } from '../Auth/ApiUser';
import Loading from '../Loading';
import useToken from '../Auth//UseToken';
import { useLocation } from 'react-router-dom';

const TIME_LIMIT = 60000;

function Game() {
    // audio
    const { state } = useLocation();

    const { play: playAudioRight } = useAudio('../public/audio/right.mp3');
    const { play: playAudioWrong } = useAudio('../public/audio/wrong.mp3');
    const [sprintScore, setSprintScore] = useState(10);
    const [playing, setPlaying] = useState(!!state);
    const [finished, setFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [counterArray, setCounterArray] = useState(0);
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [level, setLevel] = useState(parseInt(state?.value) || 0);
    const [pageNumber, setPageNumber] = useState(state?.page || Math.floor(Math.random() * 30));
    const [answersBonus, setAnswersBonus] = useState(0);
    const [rightAnswers, setRightAnswers] = useState([]);
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const [error, setError] = useState('');
    const game = 'Спринт';

    const { token, userId } = useToken();

    const [muted, setMuted] = usePersistentState('muted', true);
    const toggleMute = () => {
        setMuted(!muted);
    };

    const onAnswerRight = async (points, word) => {
        if (!muted) {
            playAudioRight();
        }
        setCounterArray((counterArray + 1) % 60);
        setScore(score + points);
        setAnswersBonus(answersBonus + 1);
        setRightAnswers((oldArray) => [...oldArray, word]);
        if (token) {
            const res = await getUserWord(userId, word.id, token);
            if (res === false) {
                const optional = { source: 'game', game: 'sprint', score: '1' };
                await createUserWord(userId, word.id, token, optional);
            } else {
                console.log('change', res['optional']);
                const optional = { source: 'game', game: 'sprint', score: `${parseInt(res['optional'].score) + 1}` };
                await changeUserWord(userId, word.id, token, optional);
            }
        }

        if (answersBonus === 3) {
            setSprintScore(sprintScore + 10);
            setAnswersBonus(0);
        }
    };
    const onAnswerWrong = async (word) => {
        if (!muted) {
            playAudioWrong();
        }
        if (token) {
            const res = await getUserWord(userId, word.id, token);
            if (res === false) {
                const optional = { source: 'game', game: 'sprint', score: '0' };
                await createUserWord(userId, word.id, token, optional);
            } else {
                console.log('change', res['optional']);
                const optional = { source: 'game', game: 'sprint', score: `${parseInt(res['optional'].score) - 1}` };
                await changeUserWord(userId, word.id, token, optional);
            }
        }

        setCounterArray((counterArray + 1) % 60);
        setScore(score);
        setSprintScore(10);
        setAnswersBonus(0);
        setWrongAnswers((oldArray) => [...oldArray, word]);
    };

    const getList = async (level, pageNumber) => {
        try {
            setError('');
            setLoading(true);
            const res1 = await axios.get(`https://teamwork-rs.herokuapp.com/words?group=${level}&page=${pageNumber}`);
            const res2 = await axios.get(
                `https://teamwork-rs.herokuapp.com/words?group=${level}&page=${(pageNumber + 1) % 30}`
            );
            const res3 = await axios.get(
                `https://teamwork-rs.herokuapp.com/words?group=${level}&page=${(pageNumber + 2) % 30}`
            );
            const res1Data = res1.data;
            const res2Data = res2.data;
            const res3Data = res3.data;

            setWords(res1Data.concat(res2Data, res3Data));
            setLoading(false);
        } catch (e) {
            const error = e;
            console.log(e);
            setLoading(false);
            setError(error.message);
        }
    };

    useEffect(() => {
        getList(level, pageNumber);
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

    const restartGame = (e) => {
        setPlaying(false);
        setFinished(false);
    };

    // random
    const really = Math.random() < 0.5;
    const originalWord = words[counterArray];

    // choose next word
    let otherWord = originalWord;
    if (!really) {
        const index = (counterArray + 20) % 60;
        otherWord = words[index];
    }

    if (!words.length && playing) {
        return (
            <div>
                <Row className="justify-content-md-center">
                    <Loading />
                </Row>
            </div>
        );
    }

    if (loading) {
        return (
            <div>
                <Row className="justify-content-md-center">
                    <Loading />
                </Row>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <div>
                    <Row className="justify-content-md-center">
                        <p>{error}</p>
                    </Row>
                </div>
            </div>
        );
    }

    return (
        <div>
            {!playing && !finished && !state && <DifficultiesScreen action={startGame} game={game} />}
            {playing && (
                <div>
                    <Row>
                        <Col className="d-flex">
                            <ToggleMute muted={muted} toggleMute={toggleMute}  />
                            <ToggleButton />
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md={4} className="p-5 mb-4 bg-light rounded-3 text-center">
                            <Score value={score} />
                            <h4>+{sprintScore} очков</h4>
                            <div className="dots p-2">
                                {answersBonus >= 1 ? <div className="dot dot1 active" /> : <div className="dot dot1" />}
                                {answersBonus >= 2 ? <div className="dot dot2 active" /> : <div className="dot dot2" />}
                                {answersBonus >= 3 ? <div className="dot dot3 active" /> : <div className="dot dot3" />}
                            </div>
                            <Question
                                originalWord={originalWord}
                                onAnswerRight={onAnswerRight}
                                onAnswerWrong={onAnswerWrong}
                                really={really}
                                otherWord={otherWord}
                                sprintScore={sprintScore}
                            />
                            <Row>
                                <Col>
                                    <Timer time={TIME_LIMIT} onEnd={endGame} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            )}
            {finished && (
                <FinishStat
                    score={score}
                    rightAnswers={rightAnswers}
                    wrongAnswers={wrongAnswers}
                    handleClickRestart={restartGame}
                />
            )}
        </div>
    );
}

export default Game;
