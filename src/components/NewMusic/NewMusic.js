import React, { useEffect, useState } from "react";

import { MdViewList, MdViewModule, MdViewWeek } from "react-icons/md";

import Album from "../Search/Album";
import Card from "../UI/Card/Card";
import View from "../UI/View/View";

import './NewMusic.css';


const NewMusic = ({ data }) => {

    const viewType = localStorage.getItem('view-type');

    const [checkedValue, setCheckedValue] = useState(viewType ? viewType : 'list');

    const albums = data.albums.map(album => <Album album={album} key={album.id} /> );

    
    
    const viewChangeHandler = (event) => {

        localStorage.setItem('view-type', event.target.value);
        console.log(event.target.value);

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
            {/* <div className='icons radioGroup' onChange={viewChangeHandler}>
                <div className='list'>
                    <input type="radio" id="view-list" name="selector" value="list" checked={checkedValue === 'list'} />
                    <label htmlFor="view-list"><MdViewList /></label>
                </div>
                <div className='grid'>
                    <input type="radio" id="view-grid" name="selector" value="grid" checked={checkedValue === 'grid'}/>
                    <label htmlFor="view-grid"><MdViewModule /></label>
                </div>
                <div className='column'>
                    <input type="radio" id="view-column" name="selector" value="column" checked={checkedValue === 'column'} />
                    <label htmlFor="view-column"><MdViewWeek /></label>
                </div>
            </div> */}
            <Card className='trending'>
                {albums}
            </Card>
        </>
        
    );
};

export default NewMusic;