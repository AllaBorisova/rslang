import { useState } from 'react'
import useToken from '../components/Auth/UseToken'

function Store() {
    const [currentAuth, setCurrentAuth] = useState(false)
    const ourUserId = useToken().userId
    return { currentAuth, setCurrentAuth, ourUserId }
}

export default Store
