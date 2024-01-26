import React, { useState } from "react";
import { FaImage } from "react-icons/fa";

import axios from "axios";

import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import Toast from "../UI/Toast/Toast";

import api from "../../Helpers/AxiosClient";

import classes from './CollectionEdit.module.css';


const CollectionEdit = ({ data }) => {

    const [enteredImageUrl, setEnteredImageUrl] = useState(data.imageUrl ? data.imageUrl : '');
    const [isFileSelector, setIsFileSelector] = useState(false);
    const [file, setFile] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);


    const updateCollectionImageHandler = () => {
        setIsFileSelector(true);
    };


    const onImageChangeHandler = event => {
        setFile(event.target.files[0]);
        setIsDisabled(false);
    };


    const onImageUploadHandler = async event => {
        event.preventDefault();

        setIsSubmitting(true);
        setIsDisabled(true);

        var formData = new FormData();
        formData.append('image', file);

        api.uploadUserCollectionImage(data.username, data.name, formData)
        .then(res => {
            setIsSubmitting(false);
            setEnteredImageUrl(res.data.imageUrl);
            setIsFileSelector(false);
            setIsDisabled(false);
            Toast('success', 'Collection image uploaded successfully');
        })
        .catch(err => {
            setIsSubmitting(false);
            setIsFileSelector(false);
            setIsDisabled(false);
            Toast('error', err.response.data.message);
        });
        
    };


    const onUploadCancelHandler = () => {
        setIsFileSelector(false);
    };


    const formatDate = date => {
        let utcDate = new Date(date).toUTCString();

        return utcDate.substring(utcDate.indexOf(' '), utcDate.lastIndexOf(' ')).trim();
    }


    return (
        <>
            { isFileSelector && 
                <div className={classes.overlay}>
                    <div className={classes.control}>
                        <input type="file" id="myfile" name="myfile" onChange={onImageChangeHandler} />
                    </div>
                    <div className='actions'>
                        <Button type="submit" className={classes.btn} onClick={onImageUploadHandler} disabled={isDisabled}>
                            { isSubmitting ? 'Submitting...' : 'Upload' }
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
                        value={formatDate(data.createdDate)}
                        class=''
                        readonly={true}
                    />
                    <Input
                        label="Last Updated Date"
                        type="text"
                        id="updatedDate"
                        name="updatedDate"
                        value={formatDate(data.lastUpdatedDate)}
                        class=''
                        readonly={true}
                    />
                </div>
            </Card>
        </>
    )
};


export default CollectionEdit;