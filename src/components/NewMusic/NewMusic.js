import React, { useEffect, useState } from "react";

import Album from "../Search/Album";
import MusicAction from "../UI/Button/MusicAction";
import Card from "../UI/Card/Card";
import View from "../UI/View/View";

import Wrapper from '../../helpers/Wrapper';

import './NewMusic.css';


const NewMusic = ({ data }) => {

    const username = localStorage.getItem('user');
    const viewType = localStorage.getItem('view-type');

    const [selectedView, setSelectedView] = useState(viewType ? viewType : 'list');

    const [userCollections, setUserCollections] = useState(data.collections);

    const albums = data.albums.map(album => { 
        return (
            <div className='album-wrapper' key={album.id}>
                <Album 
                    album={album} 
                    key={album.id} 
                />
                { username &&
                    <MusicAction 
                        type='album' 
                        data={album} 
                        islikeSelected={album.liked}
                        selectedCollection={album.collection ? album.collection : ''}
                        collections={userCollections} 
                    />
                }
            </div>
        );
    });
    
    
    const viewChangeHandler = (event) => {

        localStorage.setItem('view-type', event.target.value);

        setSelectedView(event.target.value);
    };


    useEffect(() => {

        var trendingClasses = document.getElementsByClassName('trending')[0].classList.value;
        trendingClasses = trendingClasses.replace('list', '').replace('column', '').replace('grid', '').trim();

        document.getElementsByClassName('trending')[0].classList.value = trendingClasses + ' ' + selectedView;
    }, [selectedView]);

    
    return (
        <Wrapper>
            <View checkedValue={selectedView} onChange={viewChangeHandler} />
            <Card className='trending'>
                {albums}
            </Card>
        </Wrapper>
        
    );
};

export default NewMusic;