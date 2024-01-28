import React, { useEffect, useState } from 'react';

import Track from '../Search/Track';
import Card from '../UI/Card/Card';
import View from '../UI/View/View';

import Wrapper from '../../helpers/Wrapper';

import './Likes.css';

const Likes = ({ data }) => {

    const viewType = localStorage.getItem('view-type');

    const [selectedView, setSelectedView] = useState(viewType ? viewType : 'list');

    const [userSongs, setUserSongs] = useState(data);


    const tracks = userSongs
        .sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
        .map(track =>  { 
            return (
                <div className='track-wrapper' key={track.id}>
                    <Track track={track} key={track.id} />
                </div>             
            )
        });
        
        
    const viewChangeHandler = (event) => {

        localStorage.setItem('view-type', event.target.value);

        setSelectedView(event.target.value);
    };
    
    
    useEffect(() => {

        var likesClasses = document.getElementsByClassName('likes')[0].classList.value;
        likesClasses = likesClasses.replace('list', '').replace('column', '').replace('grid', '').trim();

        document.getElementsByClassName('likes')[0].classList.value = likesClasses + ' ' + selectedView;
    }, [selectedView]);


    return (
        <Wrapper>
            <View checkedValue={selectedView} onChange={viewChangeHandler} />
            <Card className='likes'>
                { !userSongs && <p><b>You have not liked any songs yet.</b></p> }
                { userSongs && userSongs.length === 0 && <p><b>You have not liked any songs yet.</b></p> }
                { userSongs && tracks }
            </Card>
        </Wrapper>
    );
};

export default Likes;
