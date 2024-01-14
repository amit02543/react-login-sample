import React, { useState } from "react";

import axios from "axios";

import { FaDiamond } from "react-icons/fa6";
import { BsCollectionPlayFill, BsHandThumbsUpFill } from "react-icons/bs";

import classes from './Search.module.css';

const Track = ({ track, collections }) => {

    const [isDisabled, setIsDisabled] = useState(true);
    const [selectedType, setSelectedType] = useState("");

    const username = localStorage.getItem('user');



    const collectionOptions = collections && collections.map(collection => {
        return <option key={collection.id} value={collection.name}>{collection.name}</option>
    });

    collectionOptions && collectionOptions.unshift(<option key="" value="" disabled={true}>  -- Collection --  </option>);


    const artists = track.artists.map(artist => <li key={artist}>{artist}</li>);


    const onLikeClickHandler = async (track) => {
        
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
        })
        .catch(err => {
            console.log(err.response.data);
        });

    };


    const onAddCollectionClickHandler = event => {
        event.preventDefault();
        setIsDisabled(false);
    };


    const collectionChangeHandler = async event => {
        setSelectedType(event.target.value);
        console.log(track);

        const headers = { 
            'Content-Type': 'application/json'
        };


        const requestBody = {
            username: username,
            name: event.target.value,
            type: 'song', 
            spotifyId: track.id,
            title: track.title,
            artists: track.artists,
            album: track.album,
            duration: track.duration,
            popularity: track.popularity,
            imageUrl: track.imageUrl,
            releaseDate: track.releaseDate,
            totalTracks: 0
        };

        
        await axios.post(
            `http://localhost:8080/collections`, 
            JSON.stringify(requestBody),
            { headers }
        )
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err.response.data);
        });

        setIsDisabled(true);
    };


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
                { collections && 
                    <div className={classes.trackActions}>
                        <span>
                            <abbr title="Like song">
                                <BsHandThumbsUpFill onClick={() => onLikeClickHandler(track)} />
                            </abbr>
                        </span>
                        <span style={{width: '50px'}}></span>
                        <span>
                            <abbr title="Add track to collection"><BsCollectionPlayFill onClick={onAddCollectionClickHandler} /></abbr>
                        </span>
                        <span>
                            <select 
                                name='collection'
                                id={track.id}
                                value={selectedType}
                                onChange={collectionChangeHandler}
                                disabled={isDisabled}
                            >
                                {collectionOptions}
                            </select>
                        </span>
                    </div> 
                }
            </div>
            
        </div>
    );

};


export default Track;