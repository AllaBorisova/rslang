import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useToken from '../components/Auth/UseToken';
import Container from 'react-bootstrap/Container';

function Statistics() {
    const { token, setToken, logout, userId } = useToken();
    const [userStatistic, setUserStatistic] = useState([]);
    if (token) {
        useEffect(() => {
            const getStatistic = async () => {
                const rawResponse = await fetch(`https://teamwork-rs.herokuapp.com/users/${userId}/statistics`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    }
                } );
                console.log(content)
                const content = await rawResponse.json();
                
                // try {
                //     const rawResponse = await fetch(`https://teamwork-rs.herokuapp.com/users/${userId}/statistics`, {
                //         method: 'GET',
                //         headers: {
                //             Authorization: `Bearer ${token}`,
                //             Accept: 'application/json',
                //         }
                //     } );
                    
                //     const content = await rawResponse.json();
                //     console.log(res);
                //     setUserStatistic(res.data);
                // } catch (error) {
                //     console.log(error);
                // }
            };
            getStatistic();
        }, []);
    }

    return (
        <section className="py-4 full-section">
            <Container>
                {userStatistic && <h1>Статистика недоступна</h1>}
                {!userStatistic && <h1>Статистика недоступна</h1>}
            </Container>
        </section>
    );
}

export default Statistics;
