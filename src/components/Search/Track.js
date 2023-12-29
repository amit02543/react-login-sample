import React from "react";

import { FaDiamond } from "react-icons/fa6";

import classes from './Search.module.css';

const Track = ({ track }) => {

    const artists = track.artists.map(artist => <li key={artist}>{artist}</li>);

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
            </div>
            
        </div>
    );

};


export default Track;