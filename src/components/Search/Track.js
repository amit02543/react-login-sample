import React from "react";

import './Track.css';

const Track = ({ track }) => {

    const artists = track.artists.map( artist => <li key={artist}>{artist}</li> );


    return (
        <div className='track' key={track.id}>
            { track.imageUrl && <img src={track.imageUrl} alt="track" /> }
            
            { !track.imageUrl && <div className='noimage'>No Image Found</div> }

            <div className='track-details'>
                <h4>
                    {track.title}
                </h4>

                <p className='small'>
                    <b>Album: </b>
                    {track.album}
                </p>

                <ul className='itemlist'>
                    {artists}
                </ul>
                
                <p className='small'>
                    <b>Release Date: </b>
                    {track.releaseDate}
                </p>

                <p className='small'>
                    <b>Duration: </b>
                    {track.duration}
                </p>
                
                <p className='small'>
                    <b>Popularity: </b>
                    {track.popularity}
                </p>
            </div>
            
        </div>
    );

};


export default Track;