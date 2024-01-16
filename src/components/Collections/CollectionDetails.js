import React, { useState } from "react";

import Album from "../Search/Album";
import Track from "../Search/Track";

import classes from './CollectionDetails.module.css';
import Card from "../UI/Card/Card";

const CollectionDetails = ({ data }) => {
    
    const [collectionData, setCollectionData] = useState(data);

    const albums = collectionData
        .filter(collection => collection.type === 'album')
        .map(album => <Album album={album} key={album.spotifyId} collections={null} />);


    const songs = collectionData
        .filter(collection => collection.type === 'song')
        .map(track => <Track track={track} key={track.spotifyId} collections={null} />);


    return (
        <Card className={classes.collectionDetail}>
            { collectionData.length === 0 && <h2>No album or song added for this collection yet.</h2> }

            { collectionData.length > 0 && 
                <>
                    { albums.length > 0 && 
                        <>
                            <h3>Albums</h3>
                            <div>{albums}</div>
                        </>
                    }

                    { albums.length > 0 && songs.length > 0 && <hr />}

                    { songs.length > 0 && 
                        <>
                            <h3>Songs</h3>
                            <div>{songs}</div>
                        </>
                    }
                </>
            }
        </Card>
    )
};

export default CollectionDetails;