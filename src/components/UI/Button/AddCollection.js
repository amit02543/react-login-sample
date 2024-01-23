import React, { useState } from "react";

import axios from "axios";

import { BsCollectionPlay, BsCollectionPlayFill } from "react-icons/bs";

import './AddCollection.css';


const AddCollection = (props) => {

    const username = localStorage.getItem('user');

    const [isDisabled, setIsDisabled] = useState(true);
    const [selectedCollection, setSelectedCollection] = useState("");

    const collectionOptions = props.collections && props.collections.map(collection => {
        return <option key={collection.id} value={collection.name}>{collection.name}</option>
    });

    collectionOptions && collectionOptions.unshift(<option key="" value="" disabled={true}> -- Select Collection -- </option>);


    const onAddCollectionClickHandler = () => {
        setIsDisabled(false);
    };


    const onCollectionChangeHandler = async (event, track) => {

        setSelectedCollection(event.target.value);

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
    }


    return (
        <div className='add-collection'>
            <span onClick={onAddCollectionClickHandler}>
                <abbr title="Add to collection">
                    <BsCollectionPlay />
                </abbr>
            </span>
            <select 
                name='collection'
                id={props.track.id}
                value={selectedCollection}
                onChange={(event) => onCollectionChangeHandler(event, props.track)}
                disabled={isDisabled}
            >
                {collectionOptions}
            </select>
        </div>
    )
};


export default AddCollection;