import React, { useState } from "react";

import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";

import Toast from "../Toast/Toast";

import api from "../../../helpers/AxiosClient";

import './LikeButton.css';


const LikeButton = ({ type, data, isLiked }) => {

    const username = localStorage.getItem('user');

    const [isSongLiked, setIsSongLiked] = useState(isLiked);

    const onTrackLike = async data => {

        if(type === 'song') {

            const requestBody = { 
                id: data.id,
                title: data.title,
                artists: data.artists,
                album: data.album,
                duration: data.duration,
                popularity: data.popularity,
                imageUrl: data.imageUrl,
                releaseDate: data.releaseDate
            };


            api.addToMySongs(username, requestBody)
                .then(res => {
                    setIsSongLiked(true);
                    const message = <span><b>{data.title}</b> track is added to your music.</span>;
                    Toast('success', message);
                })
                .catch(err => {
                    setIsSongLiked(false);
                    Toast('error', err.response ? err.response.data.message : err.message);
                });

        }

        
        if(type === 'album') {

            const requestBody = { 
                id: data.id,
                name: data.name,
                artists: data.artists,
                imageUrl: data.imageUrl,
                releaseDate: data.releaseDate,
                totalTracks: data.totalTracks
            };


            api.addToMyAlbums(username, requestBody)
                .then(res => {
                    setIsSongLiked(true);
                    const message = <span><b>{data.name}</b> album is added to your album.</span>;
                    Toast('success', message);
                })
                .catch(err => {
                    setIsSongLiked(false);
                    Toast('error', err.response ? err.response.data.message : err.message);
                });

        }

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