import React, { useState } from 'react';
import axios from 'axios';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';


function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);


    const loginHandler = async (username, password) => {
        
        setIsSubmitting(true);

        const headers = { 
            'Content-Type': 'application/json'
        };

        
        await axios.post(
            'http://localhost:8080/login', 
            JSON.stringify({username, password}),
            { headers }
        )
        .then(res => {
            console.log(res);
            setErrorMessage('');
            setIsSubmitting(false);
            setIsLoggedIn(true);
        })
        .catch(err => {
            console.log(err.response.data);
            setErrorMessage(err.response.data.message);
            setIsSubmitting(false);
            setIsLoggedIn(false);
        });

    };


    const logoutHandler = () => {
        setIsLoggedIn(false);
    };


    return (
        <React.Fragment>
            <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
            <main>
                {!isLoggedIn && <Login onLogin={loginHandler} error={errorMessage} submitting={isSubmitting} />}
                {isLoggedIn && <Home onLogout={logoutHandler} />}
            </main>
        </React.Fragment>
    );
}

export default App;
