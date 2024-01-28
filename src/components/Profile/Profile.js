import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import Select from '../UI/Input/Select';
import Toast from '../UI/Toast/Toast';

import api from '../../helpers/AxiosClient';
import Wrapper from '../../helpers/Wrapper';

import classes from './Profile.module.css';


const Profile = ({ data }) => {

    const [enteredUsername, setEnteredUsername] = useState(data.username ? data.username : '');
    const [enteredProfileUrl, setEnteredProfileUrl] = useState(data.profileUrl ? data.profileUrl : '');
    const [enteredName, setEnteredName] = useState(data.name ? data.name : '');
    const [enteredPronoun, setEnteredPronoun] = useState(data.pronoun ? data.pronoun : '');
    const [enteredEmail, setEnteredEmail] = useState(data.email ? data.email : '');
    const [isFormEditable, setIsFormEditable] = useState(false);
    const [isFileSelector, setIsFileSelector] = useState(false);
    const [file, setFile] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploadDisabled, setIsUploadDisabled] = useState(true);


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

        const requestBody = { 
            email: enteredEmail, 
            pronoun: enteredPronoun, 
            name: enteredName
        };

        
        api.updateUserProfile(username, requestBody)
        .then(res => {
            setIsSubmitting(false);
            Toast('success', 'Profile updated successfully');
        })
        .catch(err => {
            setIsSubmitting(false);
            Toast('error', err.response ? err.response.data.message : err.message);
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
        
        if(!data.username) {
            setIsFileSelector(true);
        } else {
            Toast('info', 'Action is not allowed at this moment. Please try again later.');
        }
    };


    const onImageChangeHandler = event => {
        setFile(event.target.files[0]);
        setIsUploadDisabled(false);
    };


    const onImageUploadHandler = async event => {
        event.preventDefault();

        const username = localStorage.getItem('user');

        var formData = new FormData();
        formData.append('image', file);

        setIsSubmitting(true);
        setIsUploadDisabled(true);

        api.uploadUserProfileImage(username, formData)
        .then(res => {
            setIsSubmitting(false);
            setEnteredProfileUrl(res.data.profileUrl);
            setIsFileSelector(false);
            setIsUploadDisabled(true);
            localStorage.setItem('profileUrl', res.data.profileUrl);
            Toast('success', 'Profile image upload successfully');
            window.location.reload(true);
        })
        .catch(err => {
            setIsSubmitting(false);
            setIsFileSelector(false);
            setIsUploadDisabled(true);
            Toast('error', err.response ? err.response.data.message : err.message);
        });
        
    };


    const onUploadCancelHandler = () => {
        setIsFileSelector(false);
        setIsUploadDisabled(true);
    };


    return (
        <Wrapper>
            { isFileSelector && 
                <div className={classes.overlay}>
                    <div className={classes.control}>
                        <input type="file" id="myfile" name="myfile" onChange={onImageChangeHandler} />
                    </div>
                    <div className='actions'>
                        <Button type="submit" className={classes.btn} onClick={onImageUploadHandler} disabled={isUploadDisabled}>
                            { isSubmitting ? 'Uploading...' : 'Upload'}
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
                        <span onClick={updateProfilePictureHandler}><b>Update</b></span>
                    </div>
                </div>

                <div className={`${classes.control} ${data.username && !isFormEditable ? 'textRight marTop30' : classes.hidden}`}>
                    <MdEdit onClick={editFormHandler} />
                </div>

                { !isFormEditable && 
                    <div>
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
        </Wrapper>
    );
};

export default Profile;