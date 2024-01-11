import React, { useEffect, useState } from 'react';
import { json } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import axios from 'axios';

import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';

import classes from './Profile.module.css';
import Select from '../UI/Input/Select';

const Profile = ({ data }) => {

    const [enteredUsername, setEnteredUsername] = useState(data.username);
    const [enteredProfileUrl, setEnteredProfileUrl] = useState(data.profileUrl);
    const [enteredName, setEnteredName] = useState(data.name ? data.name : '');
    const [enteredPronoun, setEnteredPronoun] = useState(data.pronoun ? data.pronoun : '');
    const [enteredEmail, setEnteredEmail] = useState(data.email ? data.email : '');
    const [imageSource, setImageSource] = useState();
    const [isFormEditable, setIsFormEditable] = useState(false);
    const [isFileSelector, setIsFileSelector] = useState(false);
    const [file, setFile] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const pronounJson = {
        "": "",
        "he": "He/him/his",
        "she": "She/her/hers",
        "they": "They/them/their",
        "neither": "Neither"
    }


    const pronounOptions = Object.keys(pronounJson).map(key => {
        return <option key={key} value={pronounJson[key]}>{pronounJson[key]}</option>
    });
    

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
    };


    const onCancelHandler = event => {
        event.preventDefault();
        setIsFormEditable(false);
    };


    const updateProfilePictureHandler = () => {
        setIsFileSelector(true);
    };


    const onImageChangeHandler = event => {
        setFile(event.target.files[0]);
    };


    const onImageUploadHandler = async event => {
        event.preventDefault();
        console.log(file);

        const username = localStorage.getItem('user');

        var formData = new FormData();
        formData.append('image', file);

        await axios.post(
            `http://localhost:8080/profile/${username}/upload-image`, 
            formData, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then(res => {
            console.log(res);
            setErrorMessage('');
            setIsSubmitting(false);
            setMessage(res.data.message);
            setEnteredProfileUrl(res.data.profileUrl);
            setIsFileSelector(false);
            localStorage.setItem('profileUrl', res.data.profileUrl);
            window.location.reload(true);
        })
        .catch(err => {
            console.log(err.response.data);
            setErrorMessage(err.response.data.message);
            setIsSubmitting(false);
            setIsFileSelector(false);
        });
        
    };


    const onUploadCancelHandler = () => {
        setIsFileSelector(false);
    };


    const loadProfileImage = async () => {

        const username = localStorage.getItem('user');
    
        const response = await fetch(`http://localhost:8080/profile/${username}/profile-image`);
      
        
        if (!response.ok) {
            throw json(
                { message: 'Could not fetch user profile image.' },
                { status: 500 }
            );
        } 
        

        console.log(response);
        
        // const resData = await response.body;
        const imageBlob = await response.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);

        setImageSource(imageObjectURL);
    };


    useEffect(() => {

        if(!imageSource) {
            loadProfileImage();
        }

    }, [imageSource]);


    return (
        <>
            { isFileSelector && 
                <div className={classes.overlay}>
                    <div className={classes.control}>
                        <input type="file" id="myfile" name="myfile" onChange={onImageChangeHandler} />
                    </div>
                    <div className='actions'>
                        <Button type="submit" className={classes.btn} onClick={onImageUploadHandler}>
                            Upload
                        </Button>
                        <Button type='link' className={classes.link} onClick={onUploadCancelHandler}>
                            Cancel
                        </Button>                   
                    </div>
                </div>
            }

            <Card className={classes.profile}>

            <div>
                <div className={`${classes.w100} ${classes.profilePic}`}>
                    { enteredProfileUrl && <img src={enteredProfileUrl} alt='profile' /> }
                    { !enteredProfileUrl && <FaUser /> }
                    {/* { imageSource && <img src={imageSource} alt="Profile" /> }
                    { !imageSource && <FaUser /> } */}
                    <span onClick={updateProfilePictureHandler}><b>Update</b></span>
                </div>
            </div>

            { message && <p className={classes.success}>{message}</p>}

            { errorMessage && <p className={classes.error}>{errorMessage}</p> }

            <div className={`${classes.control} ${!isFormEditable ? 'textRight marTop30' : classes.hidden}`}>
                <MdEdit onClick={editFormHandler} />
            </div>

            { !isFormEditable && 
                <div>
                    {/* <div className={classes.control}>
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
                    </div> */}
                    <Input
                        label="Username"
                        type="text"
                        id="username"
                        name="username"
                        value={enteredUsername}
                        class=''
                        readonly={true}
                    />
                    <Input
                        label="Name"
                        type="text"
                        id="name"
                        name="name"
                        value={enteredName}
                        class=''
                        readonly={true}
                    />
                    <Input
                        label="Pronoun"
                        type="text"
                        id="pronoun"
                        name="pronoun"
                        value={enteredPronoun}
                        class=''
                        readonly={true}
                    />
                    <Input
                        label="Email"
                        type="text"
                        id="email"
                        name="email"
                        value={enteredEmail}
                        class=''
                        readonly={true}
                    />
                </div>
            }

            { isFormEditable && 

                <form onSubmit={submitHandler}>
                    {/* <div className={classes.control}>
                        <label htmlFor="username">Username</label>
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
                        <select 
                            name="pronoun" 
                            id="pronoun" 
                            onChange={pronounChangeHandler}
                            value={enteredPronoun}
                        >
                            {pronounOptions}
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
                    </div> */}
                    <Input
                        label="Username"
                        type="text"
                        id="username"
                        name="username"
                        value={enteredUsername}
                        class=''
                        readonly={true}
                    />
                    <Input
                        label="Name"
                        type="text"
                        id="name"
                        name="name"
                        value={enteredName}
                        onChange={nameChangeHandler}
                        class=''
                    />
                    <Select
                        label="Pronoun"
                        id="pronoun"
                        name="pronoun"
                        value={enteredPronoun}
                        onChange={pronounChangeHandler}
                        options={pronounOptions}
                        class=''
                    />
                    <Input
                        label="E-Mail"
                        type="email"
                        id="email"
                        name="email"
                        value={enteredEmail}
                        onChange={emailChangeHandler}
                        class=''
                    />
                    <div className='actions'>
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
        </>      
    );
};

export default Profile;