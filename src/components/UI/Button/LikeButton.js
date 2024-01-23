import React from "react";

import axios from "axios";

import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";

import Toast from "../Toast/Toast";

import './LikeButton.css';


const LikeButton = ({ track }) => {

    const username = localStorage.getItem('user');

    const onTrackLike = async track => {

        const headers = { 
            'Content-Type': 'application/json'
        };


        const requestBody = { 
            id: track.id,
            title: track.title,
            artists: track.artists,
            album: track.album,
            duration: track.duration,
            popularity: track.popularity,
            imageUrl: track.imageUrl,
            releaseDate: track.releaseDate
        };

        
        await axios.post(
            `http://localhost:8080/user/${username}/likes`, 
            JSON.stringify(requestBody),
            { headers }
        )
        .then(res => {
            const message = <span><b>{track.title}</b> song is added to your liked music.</span>;
            Toast('success', message);
        })
        .catch(err => {
            console.log(err.response.data);
            Toast('error', err.response.data.message);
        });

    };


    return (
        <div onClick={() => onTrackLike(track)} className='like-btn'>
            <span>
                <abbr title="Like song">
                    <BsHandThumbsUp />
                </abbr>
            </span>
        </div>
    )
};


export default LikeButton;