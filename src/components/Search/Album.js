import React, { useState } from "react";

import axios from "axios";

import { BsCollectionPlayFill, BsHandThumbsUpFill } from "react-icons/bs";
import { FaDiamond } from "react-icons/fa6";

import classes from './Search.module.css';

const Album = ({ album, collections }) => {

    const [isDisabled, setIsDisabled] = useState(true);
    const [selectedType, setSelectedType] = useState("");

    const username = localStorage.getItem('user');


    const collectionOptions = collections && collections.map(collection => {
        return <option key={collection.id} value={collection.name}>{collection.name}</option>
    });

    collectionOptions && collectionOptions.unshift(<option key="" value="" disabled={true}>  -- Collection --  </option>);


    const artists = album.artists.map(artist => <li key={artist}>{artist}</li>);


    const onAlbumLikeHandler = async (album) => {
        
        console.log(album);
        
        const headers = { 
            'Content-Type': 'application/json'
        };


        // const requestBody = { 
        //     id: track.id,
        //     title: track.title,
        //     artists: track.artists,
        //     album: track.album,
        //     duration: track.duration,
        //     popularity: track.popularity,
        //     imageUrl: track.imageUrl,
        //     releaseDate: track.releaseDate
        // };

        
        // await axios.post(
        //     `http://localhost:8080/user/${username}/likes`, 
        //     JSON.stringify(requestBody),
        //     { headers }
        // )
        // .then(res => {
        //     console.log(res);
        // })
        // .catch(err => {
        //     console.log(err.response.data);
        // });

    };
    


    const onAddCollectionClickHandler = event => {
        event.preventDefault();
        setIsDisabled(false);
    };


    const collectionChangeHandler = async event => {
        setSelectedType(event.target.value);
        console.log(album);

        const headers = { 
            'Content-Type': 'application/json'
        };


        const requestBody = {
            username: username,
            name: event.target.value,
            type: 'album', 
            spotifyId: album.id,
            title: "",
            artists: album.artists,
            album: album.name,
            duration: 0,
            popularity: 0,
            imageUrl: album.imageUrl,
            releaseDate: album.releaseDate,
            totalTracks: album.totalTracks
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
        <div className={classes.wrapper} key={album.id}>
            { album.imageUrl && <img src={album.imageUrl} alt="album" width="100" height="100" /> }
            
            { !album.imageUrl && <div className={classes.noimage}>No Image Found</div> }

            <div className=''>
                <h4>{album.name}</h4>
                <ul className={classes.itemlist}>{artists}</ul>
                <p>
                    <span><b>Release Date: </b>{album.releaseDate}</span>
                    <FaDiamond />
                    <span><b>Tracks: </b>{album.totalTracks}</span>
                </p>
            </div>
            {   collections && 
                    <div className={classes.trackActions}>
                        <span>
                            <abbr title="Like song">
                                <BsHandThumbsUpFill onClick={() => onAlbumLikeHandler(album)} />
                            </abbr>
                        </span>
                        <span style={{width: '50px'}}></span>
                        <span>
                            <abbr title="Add track to collection"><BsCollectionPlayFill onClick={onAddCollectionClickHandler} /></abbr>
                        </span>
                        <span>
                            <select 
                                name='collection'
                                id={album.id}
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
    );
};

export default Album;