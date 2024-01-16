import React, { useState } from "react";
import { FaImage } from "react-icons/fa";

import axios from "axios";

import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";

import classes from './CollectionEdit.module.css';


const CollectionEdit = ({ data }) => {

    const [enteredImageUrl, setEnteredImageUrl] = useState(data.imageUrl);
    const [formIsValid, setFormIsValid] = useState(false);
    const [isFileSelector, setIsFileSelector] = useState(false);
    const [file, setFile] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const updateCollectionImageHandler = () => {
        setIsFileSelector(true);
    };


    const onImageChangeHandler = event => {
        setFile(event.target.files[0]);
        setFormIsValid(true);
    };


    const onImageUploadHandler = async event => {
        event.preventDefault();
        console.log(file);

        var formData = new FormData();
        formData.append('image', file);

        await axios.post(
            `http://localhost:8080/user/${data.username}/collections/${data.name}/upload`, 
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
            setEnteredImageUrl(res.data.profileUrl);
            setIsFileSelector(false);
            setFormIsValid(false);
            window.location.reload(true);
        })
        .catch(err => {
            console.log(err.response.data);
            setErrorMessage(err.response.data.message);
            setIsSubmitting(false);
            setIsFileSelector(false);
            setFormIsValid(false);
        });
        
    };


    const onUploadCancelHandler = () => {
        setIsFileSelector(false);
    };



    return (
        <>
            { isFileSelector && 
                <div className={classes.overlay}>
                    <div className={classes.control}>
                        <input type="file" id="myfile" name="myfile" onChange={onImageChangeHandler} />
                    </div>
                    <div className='actions'>
                        <Button type="submit" className={classes.btn} onClick={onImageUploadHandler} disabled={!formIsValid}>
                            Upload
                        </Button>
                        <Button type='link' className={classes.link} onClick={onUploadCancelHandler}>
                            Cancel
                        </Button>                   
                    </div>
                </div>
            }

            <Card className={classes.collectionEdit}>

                <div className={`${classes.w100} ${classes.collectionImage}`}>
                    { enteredImageUrl && <img src={enteredImageUrl} alt='collection' /> }
                    { !enteredImageUrl && <FaImage /> }
                    <span onClick={updateCollectionImageHandler}><b>Update</b></span>
                </div>

                { message && <p className={classes.success}>{message}</p>}

                { errorMessage && <p className={classes.error}>{errorMessage}</p> }

                <div className={classes.collectionDetail}>
                    <Input
                        label="Username"
                        type="text"
                        id="username"
                        name="username"
                        value={data.username}
                        class=''
                        readonly={true}
                    />
                    <Input
                        label="Name"
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        class=''
                        readonly={true}
                    />
                    <Input
                        label="Created Date"
                        type="text"
                        id="createdDate"
                        name="createdDate"
                        value={data.createdDate}
                        class=''
                        readonly={true}
                    />
                    <Input
                        label="Last Updated Date"
                        type="text"
                        id="updatedDate"
                        name="updatedDate"
                        value={data.lastUpdatedDate}
                        class=''
                        readonly={true}
                    />
                </div>
            </Card>
        </>
    )
};


export default CollectionEdit;