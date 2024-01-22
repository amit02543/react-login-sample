import React from "react";

import AddCollection from "./AddCollection";
import LikeButton from "./LikeButton";

import './MusicAction.css';

import classes from './MusicAction.module.css';


const MusicAction = props => {
    return (
        // <div className={classes.musicAction}>
        <div className='music-actions'>
            <LikeButton />
            <AddCollection track={props.track} />
        </div>
    );
};


export default MusicAction;