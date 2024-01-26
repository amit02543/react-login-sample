import React from "react";

import './Artist.css';

const Artist = ({ artist }) => {

    const genres = artist.genres.map( genre => <li key={genre}>{genre}</li> );

    return (
        <div className='artist' key={artist.id}>
            { artist.imageUrl && <img src={artist.imageUrl} alt="artist" /> }
            
            { !artist.imageUrl && <div className='noimage'>No Image Found</div> }

            <div className='artist-details'>
                <h4>
                    {artist.name}
                </h4>

                <ul className='itemlist'>
                    {genres}
                </ul>
                
                <p className='small'>
                    <b>Followers: </b>
                    {artist.followers.toLocaleString()}
                </p>
                
                <p className='small'>
                    <b>Popularity: </b>
                    {artist.popularity}
                </p>
            </div>
            
        </div>
    );

};


export default Artist;