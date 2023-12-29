import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import axios from 'axios';

import Card from '../UI/Card/Card';

import classes from './Register.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const Register = () => {

    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    

    const registerHandler = async () => {
        setIsSubmitting(true);

        const headers = { 
            'Content-Type': 'application/json'
        };


        const requestBody = {
            username: enteredUsername, 
            email: enteredEmail, 
            password: enteredPassword, 
            confirmPassword: enteredConfirmPassword
        };

        
        await axios.post(
            'http://localhost:8080/register', 
            JSON.stringify(requestBody),
            { headers }
        )
        .then(res => {
            console.log(res);
            setErrorMessage('');
            setIsSubmitting(false);
            setMessage(res.data.message);
        })
        .catch(err => {
            console.log(err.response.data);
            setErrorMessage(err.response.data.message);
            setIsSubmitting(false);
        });

    };


    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);

        setFormIsValid(
            event.target.value.trim().length > 0 
                && enteredEmail.includes('@') 
                && enteredPassword.trim().length >= 6
                && enteredConfirmPassword.trim().length >= 6
                && enteredPassword === enteredConfirmPassword
        );
    };


    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    
        setFormIsValid(
            enteredUsername.trim().length > 0
                && event.target.value.includes('@') 
                && enteredPassword.trim().length > 6
                && enteredConfirmPassword.trim().length >= 6
                && enteredPassword === enteredConfirmPassword
        );
    };


    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);

        setFormIsValid(
            enteredUsername.trim().length > 0 
                && enteredEmail.includes('@') 
                && event.target.value.trim().length >= 6
                && enteredConfirmPassword.trim().length >= 6
                && event.target.value === enteredConfirmPassword
        );
    };


    const confirmPasswordChangeHandler = (event) => {
        setEnteredConfirmPassword(event.target.value);

        setFormIsValid(
            enteredUsername.trim().length > 0 
                && enteredEmail.includes('@') 
                && enteredPassword.trim().length >= 6
                && event.target.value.trim().length >= 6
                && enteredPassword === event.target.value
        );
    };


    const submitHandler = (event) => {
        event.preventDefault();
        registerHandler();
    };



    return (
        <Card className={classes.register}>
            { message && <p className={classes.success}>{message}</p>}
            { errorMessage && <p className={classes.error}>{errorMessage}</p> }

            <form onSubmit={submitHandler}>
                {/* <div className={classes.control}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={enteredUsername}
                        onChange={usernameChangeHandler}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={enteredEmail}
                        onChange={emailChangeHandler}
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
                <div className={classes.control}>
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input
                        type="password"
                        id="cpassword"
                        value={enteredConfirmPassword}
                        onChange={confirmPasswordChangeHandler}
                    />
                </div> */}
                <Input
                    label="Username"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter username here"
                    value={enteredUsername}
                    onChange={usernameChangeHandler}
                    class=''
                />
                <Input
                    label="E-Mail"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email here"
                    value={enteredEmail}
                    onChange={emailChangeHandler}
                    class=''
                />
                <Input
                    label="Password"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password here"
                    value={enteredPassword}
                    onChange={passwordChangeHandler}
                    class=''
                />
                <Input
                    label="Confirm Password"
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    placeholder="Enter confirm password here"
                    value={enteredConfirmPassword}
                    onChange={confirmPasswordChangeHandler}
                    class=''
                />
                <div className='actions'>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                        { isSubmitting ? 'Submitting...' : 'Register' }
                    </Button>
                    <Link to='/' className='cancel'>
                        Cancel
                    </Link>
                </div>
            </form>
        </Card>
    );
}

export default Register;