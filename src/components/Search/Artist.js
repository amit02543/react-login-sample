import React from "react";

import { FaDiamond } from "react-icons/fa6";

import classes from './Search.module.css';

const Artist = ({ artist }) => {

    const genres = artist.genres.map(genre => <li key={genre}>{genre}</li>);

    return (
        <div className={classes.wrapper} key={artist.id}>
            { artist.imageUrl && <img src={artist.imageUrl} alt="artist" width="100" height="100" /> }
            
            { !artist.imageUrl && <div className={classes.noimage}>No Image Found</div> }

            <div className=''>
                <h4>{artist.name}</h4>
                <ul className={classes.itemlist}>{genres}</ul>
                <p>
                    <span><b>Followers: </b>{artist.followers.toLocaleString()}</span>
                    <FaDiamond />
                    <span><b>Popularity: </b>{artist.popularity}</span>
                </p>
            </div>
            
        </div>
    );

};


export default Artist;