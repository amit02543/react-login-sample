import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import axios from 'axios';

import Card from '../UI/Card/Card';

import classes from './Profile.module.css';
import Button from '../UI/Button/Button';

const Profile = ({ data }) => {

    const [enteredUsername, setEnteredUsername] = useState(data.username);
    const [enteredName, setEnteredName] = useState(data.name ? data.name : '');
    const [enteredPronoun, setEnteredPronoun] = useState(data.pronoun ? data.pronoun : '');
    const [enteredEmail, setEnteredEmail] = useState(data.email ? data.email : '');
    const [isFormEditable, setIsFormEditable] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const updateProfile = async () => {
        setIsSubmitting(true);

        const username = localStorage.getItem('user');

        const headers = { 
            'Content-Type': 'application/json'
        };


        const requestBody = { 
            email: enteredEmail, 
            pronoun: enteredPronoun, 
            name: enteredName
        };

        
        await axios.put(
            `http://localhost:8080/profile/${username}`, 
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


    const nameChangeHandler = event => {
        setEnteredName(event.target.value.trim());
    
        setFormIsValid(
            event.target.value.trim().length > 2
                && enteredEmail.includes('@')
        );
    };


    const pronounChangeHandler = event => {
        setEnteredPronoun(event.target.value);
    
        setFormIsValid(
            enteredName.trim().length > 2
                && enteredEmail.includes('@')
        );
    };


    const emailChangeHandler = event => {
        setEnteredEmail(event.target.value.trim());
    
        setFormIsValid(
            event.target.value.includes('@')
                && enteredName.trim().length > 2
        );
    };


    const submitHandler = event => {
        event.preventDefault();
        updateProfile();
        setIsFormEditable(false);
        setFormIsValid(false);
    };


    const editFormHandler = () => {
        setIsFormEditable(true);
    }


    const onCancelHandler = event => {
        event.preventDefault();
        setIsFormEditable(false);
    }


    return (
        <Card className={classes.profile}>

            { message && <p className={classes.success}>{message}</p>}

            { errorMessage && <p className={classes.error}>{errorMessage}</p> }

            { !isFormEditable && 
                <div>
                    <div className={classes.control}>
                        <MdEdit onClick={editFormHandler} />
                    </div>
                    <div className={classes.control}>
                        <label>Username</label>
                        <span className={classes.readOnly}>{enteredUsername}</span>
                    </div>
                    <div className={classes.control}>
                        <label>Name</label>
                        <span className={classes.readOnly}>{enteredName}</span>
                    </div>
                    <div className={classes.control}>
                        <label>Pronoun</label>
                        <span className={classes.readOnly}>{enteredPronoun}</span>
                    </div>
                    <div className={classes.control}>
                        <label>Email</label>
                        <span className={classes.readOnly}>{enteredEmail}</span>
                    </div>
                </div>
            }

            { isFormEditable && 

                <form onSubmit={submitHandler}>
                    <div className={classes.control}>
                        <label htmlFor="username">Username</label>
                        {/* <input
                            type="text"
                            id="username"
                            value={data.username}
                            readOnly
                        /> */}
                        <span className={classes.readOnly}>{enteredUsername}</span>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={enteredName}
                            onChange={nameChangeHandler}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">Pronoun</label>
                        {/* <input
                            type="text"
                            id="pronoun"
                            value={data.pronoun}
                            onChange={pronounChangeHandler}
                        /> */}
                        {/* <input list="pronoun" name="pronoun" onChange={pronounChangeHandler} />
                        <datalist id="pronoun">
                            <option value="" />
                            <option value="He" />
                            <option value="She" />
                        </datalist> */}
                        <select 
                            name="pronoun" 
                            id="pronoun" 
                            onChange={pronounChangeHandler}
                            value={enteredPronoun}
                        >
                            <option key="" value=""></option>
                            <option key="he" value="he">He</option>
                            <option key="she" value="she">She</option>
                        </select>
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
                    <div className={classes.actions}>
                        <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                            { isSubmitting ? 'Submitting...' : 'Update' }
                        </Button>
                        <Button type='link' className={classes.link} onClick={onCancelHandler}>
                            Cancel
                        </Button>
                    </div>
                </form>
            }
        </Card>        
    );
};

export default Profile;