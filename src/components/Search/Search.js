import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Artist from './Artist';
import Album from './Album';
import Track from './Track';

import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import Select from '../UI/Input/Select';
import Toast from '../UI/Toast/Toast';

import api from '../../helpers/AxiosClient';

import classes from './Search.module.css';


const Search = () => {

    const [enteredQuery, setEnteredQuery] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
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
    

    const albums = albumsData.map(album => <Album album={album} key={album.id} /> );

    const artists = artistsData.map(artist => <Artist artist={artist} key={artist.id} /> );

    const tracks = tracksData.map(track => <Track track={track} key={track.id} />);


    const search = async () => {
        
        setIsSubmitting(true);

        api.fetchResultBySearchTermAndType(enteredQuery, selectedType)
        .then(res => {
            setSearchData(res.data);
            setAlbumsData(res.data.albums);
            setArtistsData(res.data.artists);
            setTracksData(res.data.tracks);
            setIsSubmitting(false);
        })
        .catch(err => {
            setSearchData(null);
            setIsSubmitting(false);
            Toast('error', err.response ? err.response.data.message : err.message);
        });

    };


    const queryChangeHandler = event => {
        setEnteredQuery(event.target.value);
    
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

            <form onSubmit={submitHandler}>
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