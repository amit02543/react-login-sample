import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import Card from '../UI/Card/Card';

import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {

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


    // useEffect(() => {

    //     // const identifier = setTimeout(() => {
    //     //   validateUserLogin();
    //     // }, 500);
    
    //     // return () => { clearTimeout(identifier) }; 
    //     console.log('use effect error message: ' + errorMessage);   
    //     if(errorMessage) {
    //         validateUserLogin();
    //     }
    // }, [errorMessage]);
    

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

        // const response = await fetch('http://localhost:8080/login', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({username: enteredUsername, password: enteredPassword})
        // }).then(res => {
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err);
        // });

        // console.log(response);
        // console.log(response.ok);

        // if(!response.ok) {
        //     console.log('setting error message: ' + response.message);
        //     setErrorMessage(response.message);
        // }

    };

    // const submitHandler = useCallback( async event => {
    //     event.preventDefault();
        

    //     setIsSubmitting(true);

    //     const headers = { 
    //         'Content-Type': 'application/json'
    //     };
        
    //     const response = await axios.post(
    //         'http://localhost:8080/login', 
    //         JSON.stringify({username: enteredUsername, password: enteredPassword}),
    //         { headers }
    //     )
    //     .then(res => {
    //         console.log(res);
    //         setIsSubmitting(false);
    //     })
    //     .catch(err => {
    //         console.log(err.response.data);
    //         console.log(err.response.data.message);
    //         setErrorMessage(err.response.data.message);
    //         console.log(errorMessage);
    //         setIsSubmitting(false);
    //     });

    // }, [errorMessage])


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
    