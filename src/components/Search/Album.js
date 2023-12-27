import React from "react";

import { FaDiamond } from "react-icons/fa6";

import classes from './Album.module.css';

const Album = ({ album }) => {

    const artists = album.artists.map(artist => <li key={artist}>{artist}</li>);

    return (
        <div className={classes.wrapper} key={album.id}>
            { album.imageUrl && <img src={album.imageUrl} alt="album" width="100" height="100" /> }
            
            { !album.imageUrl && <div className={classes.noimage}>No Image Found</div> }

            <div className=''>
                <h4>{album.name}</h4>
                <ul className={classes.artists}>{artists}</ul>
                <p>
                    <span><b>Release Date: </b>{album.releaseDate}</span>
                    <FaDiamond />
                    <span><b>Tracks: </b>{album.totalTracks}</span>
                </p>
            </div>
            
        </div>
    );
};

export default Album;