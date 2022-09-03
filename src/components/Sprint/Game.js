import React, { useEffect, useState } from 'react';
import axios from 'axios';
import usePersistentState from '../../hooks/usePersistentState'
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
import { createUserWord } from '../Auth/ApiUser';
import Loading from '../Loading';
import useToken from '../Auth//UseToken'

const TIME_LIMIT = 60000;

function Game() {
    // audio

    const { play: playAudioRight } = useAudio('../public/audio/right.mp3');
    const { play: playAudioWrong } = useAudio('../public/audio/wrong.mp3');
    const [sprintScore, setSprintScore] = useState(10);
    const [playing, setPlaying] = useState(false);
    const [finished, setFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [counterArray, setCounterArray] = useState(0);
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [level, setLevel] = useState(1);
    const [pageNumber, setPageNumber] = useState(Math.floor(Math.random() * 30));
    const [answersBonus, setAnswersBonus] = useState(0);
    const [rightAnswers, setRightAnswers] = useState([]);
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const [error, setError] = useState('');
    const game = 'Спринт';

    const { token, userId } = useToken()

    const [muted, setMuted] = usePersistentState('muted', true)
    const toggleMute = () => {
        setMuted(!muted)
    }
    console.log('muted', muted)

    const onAnswerRight = async (points, word) => {
        if (!muted) {
            playAudioRight();
        }
        setCounterArray((counterArray + 1) % 60);
        setScore(score + points);
        setAnswersBonus(answersBonus + 1);
        setRightAnswers((oldArray) => [...oldArray, word]);

        const res = await createUserWord( userId, word.id, word, token );
        console.log(res)

        if (answersBonus === 3) {
            setSprintScore(sprintScore + 10);
            setAnswersBonus(0);
        }
    };
    const onAnswerWrong = (word) => {
        if (!muted) {
            playAudioWrong();
        }
        setCounterArray((counterArray + 1) % 60);
        setScore(score);
        setSprintScore(10);
        setAnswersBonus(0);
        setWrongAnswers((oldArray) => [...oldArray, word]);
    };

    const getList = async () => {
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
        // document.addEventListener(
        //     'keydown',
        //     (event) => {
        //         const keyName = event.key;
        //         console.log(event.key);
        //         if (keyName === 'ArrowRight') {
        //             console.log('неверно');
        //             onAnswerRight(sprintScore, otherWord);
        //             return;
        //         }
        //         if (keyName === 'ArrowLeft') {
        //             console.log('верно');
        //             onAnswerWrong(otherWord);
        //             return;
        //         }
        //     },
        //     false
        // );
    } else {
        // document.addEventListener(
        //     'keydown',
        //     (event) => {
        //         const keyName = event.key;
        //         console.log(event.key);
        //         if (keyName === 'ArrowRight') {
        //             console.log('неверно');
        //             onAnswerRight(sprintScore, otherWord);
        //             return;
        //         }
        //         if (keyName === 'ArrowLeft') {
        //             console.log('верно');
        //             onAnswerWrong(otherWord);
        //             return;
        //         }
        //     },
        //     false
        // );
    }

    if (loading) {
        return (
            <div>
                <div>
                    <Row className="justify-content-md-center">
                        <Loading />
                    </Row>
                </div>
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
            {!playing && !finished && <DifficultiesScreen action={startGame} game={game} />}

            {playing && (
                <div>
                    <ToggleMute muted={muted} toggleMute={toggleMute} />
                    <ToggleButton />
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
