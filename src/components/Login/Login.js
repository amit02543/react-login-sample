import React, { useState } from 'react';
import axios from 'axios';

import Card from '../UI/Card/Card';

import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = () => {

    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    async function validateUserLogin() {
        setIsSubmitting(true);

        const headers = { 
            'Content-Type': 'application/json'
        };
        
        const response = await axios.post(
            'http://localhost:8080/login', 
            JSON.stringify({username: enteredUsername, password: enteredPassword}),
            { headers }
        )
        .then(res => {
            console.log(res);
            setErrorMessage('');
            setIsSubmitting(false);
        })
        .catch(err => {
            console.log(err.response.data);
            console.log(err.response.data.message);
            setErrorMessage(err.response.data.message);
            console.log(errorMessage);
            setIsSubmitting(false);
        });
    }
    

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);

        setFormIsValid(
            event.target.value.trim().length > 0 && enteredPassword.trim().length >= 6
        );
    }


    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);

        setFormIsValid(
            enteredUsername.trim().length > 0 && event.target.value.trim().length >= 6
        );
    };



    const submitHandler = async (event) => {
        event.preventDefault();

        validateUserLogin();

    };

    return (
        <Card className={classes.login}>
            { errorMessage && <p className={classes.error}>{errorMessage}</p> }

            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="username">E-Mail</label>
                    <input
                        type="text"
                        id="username"
                        value={enteredUsername}
                        onChange={usernameChangeHandler}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                        { isSubmitting ? 'Submitting...' : 'Login' }
                    </Button>
                </div>
            </form>
        </Card>
    );
};
    
export default Login;
    