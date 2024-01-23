import React from "react";

import AddCollection from "./AddCollection";
import LikeButton from "./LikeButton";

import './MusicAction.css';

import classes from './MusicAction.module.css';


const MusicAction = props => {
    return (
        // <div className={classes.musicAction}>
        <div className='music-actions'>
            <LikeButton 
                // onLike={props.onLike} 
                track={props.data}
            />
            <AddCollection 
                track={props.data} 
                // isDisabled={props.isDisabled} 
                // onAddCollection={props.onAddCollection}
                collections={props.collections}
                // onCollectionChange={props.onCollectionChange} 
            />
        </div>
    );
};


export default MusicAction;