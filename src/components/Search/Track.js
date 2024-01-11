import React from "react";

import axios from "axios";

import { FaDiamond } from "react-icons/fa6";
import { BsCollectionPlayFill, BsHandThumbsUpFill } from "react-icons/bs";

import classes from './Search.module.css';

const Track = ({ track }) => {

    const artists = track.artists.map(artist => <li key={artist}>{artist}</li>);


    const onLikeClickHandler = async (track) => {
        const username = localStorage.getItem('user');

        const headers = { 
            'Content-Type': 'application/json'
        };


        const requestBody = { 
            id: track.id,
            title: track.title,
            artists: track.artists,
            album: track.album,
            duration: track.duration,
            popularity: track.popularity,
            imageUrl: track.imageUrl,
            releaseDate: track.releaseDate
        };

        
        await axios.post(
            `http://localhost:8080/user/${username}/likes`, 
            JSON.stringify(requestBody),
            { headers }
        )
        .then(res => {
            console.log(res);
            // setErrorMessage('');
            // setIsSubmitting(false);
            // setMessage(res.data.message);
        })
        .catch(err => {
            console.log(err.response.data);
            // setErrorMessage(err.response.data.message);
            // setIsSubmitting(false);
        });

    };


    const onAddCollectionClickHandler = event => {
        event.preventDefault();
        console.log('Add to collection: ', event.target.value);
    }


    return (
        <div className={classes.wrapper} key={track.id}>
            { track.imageUrl && <img src={track.imageUrl} alt="track" width="100" height="100" /> }
            
            { !track.imageUrl && <div className={classes.noimage}>No Image Found</div> }

            <div className=''>
                <h4>{track.title}</h4>
                <p className={classes.small}>{track.album}</p>
                <ul className={classes.itemlist}>{artists}</ul>
                <p>
                    <span><b>Release Date: </b>{track.releaseDate}</span>
                    <FaDiamond />
                    <span><b>Duration: </b>{track.duration}</span>
                    <FaDiamond />
                    <span><b>Popularity: </b>{track.popularity}</span>
                </p>
                <div className={classes.trackActions}>
                    <span>
                        <abbr title="Like song"><BsHandThumbsUpFill onClick={() => onLikeClickHandler(track)} /></abbr>
                    </span>
                    <span style={{width: '50px'}}></span>
                    <span>
                        <abbr title="Add track to collection"><BsCollectionPlayFill onClick={onAddCollectionClickHandler} /></abbr>
                    </span>
                    
                </div>
            </div>
            
        </div>
    );

};


export default Track;