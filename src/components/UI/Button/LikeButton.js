import React from "react";

import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";

import classes from './LikeButton.css';


const LikeButton = ({ onClick }) => {
    return (
        <div onClick={onClick} className='like-btn'>
            <span>
                <abbr title="Like song">
                    <BsHandThumbsUp />
                    {/* <BsHandThumbsUpFill /> */}
                </abbr>
            </span>
        </div>
    )
};


export default LikeButton;