import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import useToken from './Auth/UseToken'
import LoginPopup from './LoginPopup'
import SignUp from './SingUp'

function Header() {
    const { userId, setToken, logout } = useToken()
    // const [isLoggedin, setIsLoggedin] = useState(false)

    if (!userId) {
        return (
            <header className="my-2">
                <Container>
                    <Row className="align-items-center">
                        <Col xs={4}>
                            <h1>RSLANG</h1>
                        </Col>

                        <Col xs={8} className="text-end">
                            <LoginPopup setToken={setToken} />
                            <SignUp setToken={setToken} />
                        </Col>
                    </Row>
                </Container>
            </header>
        )
    }
    const userDataString = localStorage.getItem('userData')
    const userData = JSON.parse(userDataString)

    // const logout = () => {
    //     localStorage.removeItem('userData')
    //     // useToken.setIsAuth(false)
    //     window.location.reload()
    // }

    return (
        <header className="my-2">
            <Container>
                <Row className="align-items-center">
                    <Col xs={4}>
                        <h1>RSLANG</h1>
                    </Col>

                    <Col xs={8} className="text-end">
                        Привет, {userData.name}
                        <Button className="ms-1" variant="primary" onClick={logout}>
                            Выйти
                        </Button>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

export default Header
