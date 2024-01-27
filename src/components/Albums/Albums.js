import React, { useEffect, useState } from 'react';

import Album from '../Search/Album';
import Card from '../UI/Card/Card';
import View from '../UI/View/View';

import Wrapper from '../../Helpers/Wrapper';

import './Albums.css';

const Albums = ({ data }) => {

    const viewType = localStorage.getItem('view-type');

    const [selectedView, setSelectedView] = useState(viewType ? viewType : 'list');

    const [userAlbums, setUserAlbums] = useState(data);


    const albums = userAlbums
        .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
        .map(album =>  { 
            return (
                <div className='album-wrapper' key={album.id}>
                    <Album album={album} key={album.id} />
                </div>             
            )
        });
        
        
    const viewChangeHandler = (event) => {

        localStorage.setItem('view-type', event.target.value);

        setSelectedView(event.target.value);
    };
    
    
    useEffect(() => {

        var albumsClasses = document.getElementsByClassName('albums')[0].classList.value;
        albumsClasses = albumsClasses.replace('list', '').replace('column', '').replace('grid', '').trim();

        document.getElementsByClassName('albums')[0].classList.value = albumsClasses + ' ' + selectedView;
    }, [selectedView]);


    return (
        <Wrapper>
            <View checkedValue={selectedView} onChange={viewChangeHandler} />
            <Card className='albums'>
                { !userAlbums && <p><b>You have not liked any albums yet.</b></p> }
                { userAlbums && userAlbums.length === 0 && <p><b>You have not liked any albums yet.</b></p> }
                { userAlbums && albums }
            </Card>
        </Wrapper>
    );
};

export default Albums;
