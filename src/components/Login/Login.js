import React, { useState } from 'react';

import Card from '../UI/Card/Card';

import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {

    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);
    

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


    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(enteredUsername, enteredPassword);
    };


    return (
        <Card className={classes.login}>
            { props.error && <p className={classes.error}>{props.error}</p> }

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
                        { props.submitting ? 'Submitting...' : 'Login' }
                    </Button>
                </div>
            </form>
        </Card>
    );
};
    
export default Login;
    