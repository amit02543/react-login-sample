import React from "react";

import AddCollection from "./AddCollection";
import LikeButton from "./LikeButton";

import './MusicAction.css';


const MusicAction = props => {
    return (
        <div className='music-actions'>
            <LikeButton 
                type={props.type}
                data={props.data}
            />
            <AddCollection 
                type={props.type} 
                data={props.data} 
                collections={props.collections}
            />
        </div>
    );
};


export default MusicAction;