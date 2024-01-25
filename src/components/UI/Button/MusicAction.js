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
                isLiked={props.islikeSelected}
            />
            <AddCollection 
                type={props.type} 
                data={props.data} 
                collections={props.collections}
                selectedCollection={props.selectedCollection}
            />
        </div>
    );
};


export default MusicAction;