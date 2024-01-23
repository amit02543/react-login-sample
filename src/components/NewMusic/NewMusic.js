import React, { useEffect, useState } from "react";

import { MdViewList, MdViewModule, MdViewWeek } from "react-icons/md";

import Album from "../Search/Album";
import Card from "../UI/Card/Card";
import View from "../UI/View/View";

import './NewMusic.css';
import MusicAction from "../UI/Button/MusicAction";


const NewMusic = ({ data }) => {

    const viewType = localStorage.getItem('view-type');

    const [checkedValue, setCheckedValue] = useState(viewType ? viewType : 'list');

    const [userCollections, setUserCollections] = useState(data.collections);

    const albums = data.albums.map(album => { 
        return (
            <div className='album-wrapper' key={album.id}>
                <Album album={album} key={album.id} collections={userCollections} />
                <MusicAction type='album' data={album} collections={userCollections} />
            </div>
        );
    });
    
    
    const viewChangeHandler = (event) => {

        localStorage.setItem('view-type', event.target.value);

        setCheckedValue(event.target.value);
    };


    useEffect(() => {

        var trendingClasses = document.getElementsByClassName('trending')[0].classList.value;
        trendingClasses = trendingClasses.replace('list', '').replace('column', '').replace('grid', '').trim();

        document.getElementsByClassName('trending')[0].classList.value = trendingClasses + ' ' + checkedValue;
    }, [checkedValue]);

    
    return (
        <>
            <View checkedValue={checkedValue} onChange={viewChangeHandler} />
            <Card className='trending'>
                {albums}
            </Card>
        </>
        
    );
};

export default NewMusic;