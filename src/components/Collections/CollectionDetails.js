import React, { useEffect, useState } from "react";

import Album from "../Search/Album";
import Track from "../Search/Track";

import Card from "../UI/Card/Card";
import View from "../UI/View/View";

// import classes from './CollectionDetails.module.css';
import './CollectionDetails.css';


const CollectionDetails = ({ data }) => {

    const viewType = localStorage.getItem('view-type');

    const [selectedView, setSelectedView] = useState(viewType ? viewType : 'list');    
    const [collectionData, setCollectionData] = useState(data);


    const albums = collectionData
        .filter(collection => collection.type === 'album')
        .map(album => { 
            return (
                <div className='album-wrapper' key={album.id}>
                    <Album album={album} />
                </div>
            );
        });


    const songs = collectionData
        .filter(collection => collection.type === 'song')
        .map(track =>  { 
            return (
                <div className='track-wrapper' key={track.id}>
                    <Track track={track} />
                </div>             
            )
        });



    const viewChangeHandler = (event) => {

        localStorage.setItem('view-type', event.target.value);

        setSelectedView(event.target.value);
    };


    useEffect(() => {

        var collectionDetailClasses = document.getElementsByClassName('collectionDetail')[0].classList.value;
        collectionDetailClasses = collectionDetailClasses.replace('list', '').replace('column', '').replace('grid', '').trim();

        document.getElementsByClassName('collectionDetail')[0].classList.value = collectionDetailClasses + ' ' + selectedView;

        if(document.getElementsByClassName('collectionDetail').length > 1) {
            document.getElementsByClassName('collectionDetail')[1].classList.value = collectionDetailClasses + ' ' + selectedView;
        }

    }, [selectedView]);


    return (
        <>
            <View checkedValue={selectedView} onChange={viewChangeHandler} />

            { collectionData.length === 0 && (
                <Card className='collectionDetail'>
                    <h2>No album or song added for this collection yet.</h2>
                </Card> 
            )}

            { collectionData.length > 0 && 
                <Card className='collectionDetail'>
                    <h3>Albums</h3>

                    { albums.length === 0 && <p>No album added for this collection.</p> }
					  
                    { albums.length > 0 && <>{albums}</> }

                </Card>
            }

            { collectionData.length > 0 && 
                <Card className='collectionDetail'>
                    <h3>Songs</h3>

                    { songs.length === 0 && <p>No song added for this collection.</p> }
                    
                    { songs.length > 0 && <>{songs}</> }

                </Card>
            }
        </>
        
    )
};

export default CollectionDetails;