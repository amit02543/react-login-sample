import React, { useState } from "react";

import Album from "../Search/Album";
import Track from "../Search/Track";

import classes from './CollectionDetails.module.css';

const CollectionDetails = ({ data }) => {
    
    const [collectionData, setCollectionData] = useState(data);


    const albums = collectionData
        .filter(collection => collection.type === 'album')
        .map(album => <Album album={album} key={album.spotifyId} collections={null} />);


    const songs = collectionData
        .filter(collection => collection.type === 'song')
        .map(track => <Track track={track} key={track.spotifyId} collections={null} />);


    return (
        <>
            <h2>Albums</h2>
            <div>{albums}</div>

            <hr />

            <h2>Songs</h2>
            <div>{songs}</div>
        </>
    )
};

export default CollectionDetails;