import React, { useState } from 'react';
import { Form, Link, useActionData, useNavigation } from 'react-router-dom';

import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';

import classes from './Login.module.css';
import Input from '../UI/Input/Input';

const Login = () => {

    const data = useActionData();

    const navigation = useNavigation();

    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);

    const isSubmitting = navigation.state === 'submitting';
    

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


    return (
        <Card className={classes.login}>
            { 
                data && data.errors && <ul>
                    {
                    Object.values(data.errors).map( err => (
                        <li key={err}>{err}</li>
                    ))
                    }
                </ul>
            }

            { data && data.message && <p className={classes.error}>{data.message}</p> }

            <Form method='post'>
                {/* <div className={classes.control}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={enteredUsername}
                        onChange={usernameChangeHandler}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                    />
                </div> */}
                <Input
                    label="Username"
                    type="text"
                    id="username"
                    name="username"
                    value={enteredUsername}
                    onChange={usernameChangeHandler}
                    class=''
                />
                <Input
                    label="Password"
                    type="password"
                    id="password"
                    name="password"
                    value={enteredPassword}
                    onChange={passwordChangeHandler}
                    class=''
                />
                <div className='actions'>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                        { isSubmitting ? 'Submitting...' : 'Login' }
                    </Button>
                    <Link to='/' className='cancel'>
                        Cancel
                    </Link>
                </div>
            </Form>
        </Card>
    );
};
    
export default Login;
    