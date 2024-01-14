import React, { useEffect, useState } from "react";

import { MdViewList, MdViewModule, MdViewWeek } from "react-icons/md";

import Album from "../Search/Album";
import Card from "../UI/Card/Card";
import View from "../UI/View/View";

import './NewMusic.css';


const NewMusic = ({ data }) => {

    const viewType = localStorage.getItem('view-type');

    const [checkedValue, setCheckedValue] = useState(viewType ? viewType : 'list');

    const [userCollections, setUserCollections] = useState(data.collections);

    const albums = data.albums.map(album => <Album album={album} key={album.id} collections={userCollections} /> );

    
    
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