import React, { useState } from "react";

import axios from "axios";

import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";

import Toast from "../Toast/Toast";

import './LikeButton.css';


const LikeButton = ({ type, data, isLiked }) => {

    const username = localStorage.getItem('user');

    const [isSongLiked, setIsSongLiked] = useState(isLiked);

    const onTrackLike = async data => {

        const headers = { 
            'Content-Type': 'application/json'
        };


        let URL = `http://localhost:8080/user/${username}/likes`;


        let requestBody = { 
            id: data.id,
            title: data.title,
            artists: data.artists,
            album: data.album,
            duration: data.duration,
            popularity: data.popularity,
            imageUrl: data.imageUrl,
            releaseDate: data.releaseDate
        };    


        if(type === 'album') {

            URL = `http://localhost:8080/user/${username}/albums`;
            
            requestBody = { 
                id: data.id,
                name: data.name,
                artists: data.artists,
                imageUrl: data.imageUrl,
                releaseDate: data.releaseDate,
                totalTracks: data.totalTracks
            };
            
        }

        
        await axios.post(
            URL, 
            JSON.stringify(requestBody),
            { headers }
        )
        .then(res => {
            setIsSongLiked(true);
            
            let message = type === 'album' ? res.data.message : <span><b>{data.title}</b> song is added to your liked music.</span>;

            Toast('success', message);
        })
        .catch(err => {
            setIsSongLiked(false);
            console.log(err.response.data);
            Toast('error', err.response.data.message);
        });

    };


    return (
        <div onClick={() => onTrackLike(data)} className='like-btn'>
            <span className={`${isSongLiked ? 'active': ''}`}>
                <abbr title="Like song">
                    { isSongLiked ? <BsHandThumbsUpFill /> : <BsHandThumbsUp /> }
                </abbr>
            </span>
        </div>
    )
};


export default LikeButton;