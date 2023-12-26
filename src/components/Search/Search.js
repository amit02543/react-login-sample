import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';

import classes from './Search.module.css';

const Search = () => {

    const [enteredQuery, setEnteredQuery] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const searchTypeJson = {
        "album": "Album",
        "artist": "Artist",
        "track": "Track"        
    };


    const searchTypeOptions = Object.keys(searchTypeJson).map(key => {
        return <option key={key} value={searchTypeJson[key]}>{searchTypeJson[key]}</option>
    });
    

    const search = async () => {
        setIsSubmitting(true);

        const username = localStorage.getItem('user');

        const headers = { 
            'Content-Type': 'application/json'
        };

        
        await axios.get(
            `http://localhost:8080/spotify/search?query=${enteredQuery}&type=${selectedType}`,
            { headers }
        )
        .then(res => {
            console.log(res);
            setErrorMessage('');
            setIsSubmitting(false);
        })
        .catch(err => {
            console.log(err.response.data);
            setErrorMessage(err.response.data.message);
            setIsSubmitting(false);
        });

    };


    const queryChangeHandler = event => {
        setEnteredQuery(event.target.value.trim());
    
        setFormIsValid(
            event.target.value.trim().length > 2
        );
    };


    const typeChangeHandler = event => {
        setSelectedType(event.target.value);
        console.log('Selected Value: ', event.target.value);

        setFormIsValid(
            enteredQuery.trim().length > 2
        );
    };


    const submitHandler = event => {
        event.preventDefault();
        search();
        setFormIsValid(false);
    };


    return (           
        <Card className={classes.search}>
            
            { errorMessage && <p className={classes.error}>{errorMessage}</p> }

            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    {/* <label htmlFor="search">Query</label> */}
                    <input
                        type="text"
                        id="search"
                        placeholder='Search query here'
                        value={enteredQuery}
                        onChange={queryChangeHandler}
                    />
                </div>
                <div className={classes.control}>
                    {/* <label htmlFor="type">Type</label> */}
                    <select 
                        name="type" 
                        id="type" 
                        onChange={typeChangeHandler}
                        value={selectedType}
                    >
                        {searchTypeOptions}
                    </select>
                </div>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                        { isSubmitting ? 'Submitting...' : 'Search' }
                    </Button>
                    <Link to='/' className={classes.cancel}>
                        Cancel
                    </Link>
                </div>
            </form>
            
        </Card>  
    );
};

export default Search;