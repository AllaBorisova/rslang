import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import '../../styles/App.scss'
import WordsPage from './WordsPage'

export default function Group() {
    const BASE_URL = `https://teamwork-rs.herokuapp.com/words?`
    const [value, setValue] = useState([0])
    const [words, setWords] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)

    useEffect(() => {
        const getList = async () => {
            setLoading(true)
            const res = await axios.get(`${BASE_URL}group=${value[value.length - 1]}&pages=${page}`)
            setWords(res.data)
            console.log(res.data)
            setLoading(false)
        }
        getList()
    }, [value, page])

    const handleChange = (val) => setValue(val)

    return (
        <>
            <div className="btn-level-group">
                <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
                    <ToggleButton variant="success" id="tbg-btn-1" value={0}>
                        Level 1
                    </ToggleButton>
                    <ToggleButton variant="light" id="tbg-btn-2" value={1}>
                        Level 2
                    </ToggleButton>
                    <ToggleButton id="tbg-btn-3" value={2}>
                        Level 3
                    </ToggleButton>
                    <ToggleButton id="tbg-btn-4" value={3}>
                        Level 4
                    </ToggleButton>
                    <ToggleButton id="tbg-btn-5" value={4}>
                        Level 5
                    </ToggleButton>
                    <ToggleButton id="tbg-btn-6" value={5}>
                        Level 6
                    </ToggleButton>
                    <ToggleButton id="tbg-btn-7" value={6} disabled>
                        Level 7
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div>
                <WordsPage words={words} loading={loading} />
            </div>
        </>
    )
}
