import React, { useState } from "react";

import { BsCollectionPlay, BsCollectionPlayFill } from "react-icons/bs";

import Toast from "../Toast/Toast";

import api from "../../../helpers/AxiosClient";

import './AddCollection.css';


const AddCollection = (props) => {

    const username = localStorage.getItem('user');

    const [isDisabled, setIsDisabled] = useState(true);
    const [selectedCollection, setSelectedCollection] = useState(props.selectedCollection);

    const collectionOptions = props.collections && props.collections.map(collection => {
        return <option key={collection.id} value={collection.name}>{collection.name}</option>
    });

    collectionOptions && collectionOptions.unshift(<option key="" value="" disabled={true}> -- Select Collection -- </option>);


    const onAddCollectionClickHandler = () => {
        setIsDisabled(!isDisabled);
    };


    const onCollectionChangeHandler = async (event, data) => {

        setSelectedCollection(event.target.value);

        let requestBody = {
            username: username,
            name: event.target.value,
            type: 'song', 
            spotifyId: data.id,
            title: data.title,
            artists: data.artists,
            album: data.album,
            duration: data.duration,
            popularity: data.popularity,
            imageUrl: data.imageUrl,
            releaseDate: data.releaseDate,
            totalTracks: 0
        };


        if(props.type === 'album') {

            requestBody = {
                username: username,
                name: event.target.value,
                type: 'album', 
                spotifyId: data.id,
                title: "",
                artists: data.artists,
                album: data.name,
                duration: 0,
                popularity: 0,
                imageUrl: data.imageUrl,
                releaseDate: data.releaseDate,
                totalTracks: data.totalTracks
            };

        }
        
        
        api.addToCollection(requestBody)
        .then(res => {
            let message; 

            if(props.type === 'album') {
                message = <span><b>{data.name}</b> album is added to {event.target.value} collection.</span>;
            } else {
                message = <span><b>{data.title}</b> track is added to {event.target.value} collection.</span>;
            }

            Toast('success', message);
        })
        .catch(err => {
            Toast('error', err.response ? err.response.data.message : err.message);
        });

        setIsDisabled(true);
    }


    return (
        <div className='add-collection'>
            <span onClick={onAddCollectionClickHandler}>
                <abbr title="Add to collection">
                    {selectedCollection ? <BsCollectionPlayFill /> : <BsCollectionPlay /> }
                </abbr>
            </span>
            <select 
                name='collection'
                id={props.data.id}
                value={selectedCollection}
                onChange={(event) => onCollectionChangeHandler(event, props.data)}
                disabled={isDisabled}
            >
                {collectionOptions}
            </select>
        </div>
    )
};


export default AddCollection;