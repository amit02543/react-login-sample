import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';

import classes from './Search.module.css';
import Artist from './Artist';
import Album from './Album';
import Track from './Track';
import Input from '../UI/Input/Input';
import Select from '../UI/Input/Select';

const Search = () => {

    const [enteredQuery, setEnteredQuery] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchData, setSearchData] = useState();
    const [albumsData, setAlbumsData] = useState([]);
    const [artistsData, setArtistsData] = useState([]);
    const [tracksData, setTracksData] = useState([]);


    const searchTypeJson = {
        "": "",
        "album": "Album",
        "artist": "Artist",
        "track": "Track"        
    };


    const searchTypeOptions = Object.keys(searchTypeJson).map(key => {
        return <option key={key} value={searchTypeJson[key]}>{searchTypeJson[key]}</option>
    });
    

    const albums = albumsData.map(album => <Album album={album} /> );

    const artists = artistsData.map(artist => <Artist artist={artist} /> );

    const tracks = tracksData.map(track => <Track track={track} /> );


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
            setSearchData(res.data);
            setAlbumsData(res.data.albums);
            setArtistsData(res.data.artists);
            setTracksData(res.data.tracks);
            setErrorMessage('');
            setIsSubmitting(false);
        })
        .catch(err => {
            console.log(err.response.data);
            setSearchData({});
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
            
            { errorMessage && <p style={ { color: 'red' } }>{errorMessage}</p> }

            <form onSubmit={submitHandler}>
                {/* <div className={`${classes.control} ${classes.w70} ${classes.floatLeft}`}>
                    <input
                        type="text"
                        id="search"
                        placeholder='Search query here'
                        value={enteredQuery}
                        onChange={queryChangeHandler}
                    />
                </div>
                <div className={`${classes.control} ${classes.w25} ${classes.floatRight}`}>
                    <select 
                        name="type" 
                        id="type" 
                        onChange={typeChangeHandler}
                        value={selectedType}
                    >
                        {searchTypeOptions}
                    </select>
                </div> */}
                <div className={classes.row}>
                    <Input
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Search query here"
                        value={enteredQuery}
                        onChange={queryChangeHandler}
                        class="w70 marRight5p"
                    />
                    <Select
                        id="type"
                        name="type"
                        value={selectedType}
                        onChange={typeChangeHandler}
                        options={searchTypeOptions}
                        class="w25"
                    />
                </div>
                <div className='actions'>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                        { isSubmitting ? 'Submitting...' : 'Search' }
                    </Button>
                    <Link to='/' className='cancel'>
                        Cancel
                    </Link>
                </div>
            </form>
            
            { searchData && (
                <div className={classes.marTop30}>
                    <hr/>
                    { albums }
                    { artists }
                    { tracks }
                </div> 
            )
            }
        </Card>  
    );
};

export default Search;