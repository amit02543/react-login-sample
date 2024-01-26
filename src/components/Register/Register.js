import React, { useState } from 'react';
import { Form, Link, useActionData, useNavigation } from 'react-router-dom';

import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';

import classes from './Register.module.css';


const Register = () => {

    const data = useActionData();

    const navigation = useNavigation();


    const [enteredUsername, setEnteredUsername] = useState(data ? data.username : '');
    const [enteredEmail, setEnteredEmail] = useState(data ? data.email : '');
    const [enteredPassword, setEnteredPassword] = useState(data ? data.password : '');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState(data ? data.confirmPassword : '');
    const [formIsValid, setFormIsValid] = useState(false);

    const isSubmitting = navigation.state === 'submitting';


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



    return (
        <Card className={classes.register}>
            <Form method='post'>
                <Input
                    label="Username"
                    type="text"
                    id="username"
                    name="username"
                    placeholder=""
                    value={enteredUsername}
                    onChange={usernameChangeHandler}
                    class=''
                />
                <Input
                    label="E-Mail"
                    type="email"
                    id="email"
                    name="email"
                    placeholder=""
                    value={enteredEmail}
                    onChange={emailChangeHandler}
                    class=''
                />
                <Input
                    label="Password"
                    type="password"
                    id="password"
                    name="password"
                    placeholder=""
                    value={enteredPassword}
                    onChange={passwordChangeHandler}
                    class=''
                />
                <Input
                    label="Confirm Password"
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    placeholder=""
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
            </Form>
        </Card>
    );
}

export default Register;