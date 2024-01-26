import React from "react";

import './Album.css';


const Album = ({ album }) => {

    const artists = album.artists.map( artist => <li key={artist}>{artist}</li> );


    return (
        <div className='album' key={album.id}>
            { album.imageUrl && <img src={album.imageUrl} alt="album" /> }
            
            { !album.imageUrl && <div className='noimage'>No Image Found</div> }

            <div className='album-details'>
                <h4>
                    {album.name}
                </h4>

                <ul className='itemlist'>
                    {artists}
                </ul>

                <p className='small'>
                    <b>Release Date: </b>
                    {album.releaseDate}
                </p>

                <p className='small'>
                    <b>Tracks: </b>
                    {album.totalTracks}
                </p>
            </div>
        </div>
    );
};

export default Album;