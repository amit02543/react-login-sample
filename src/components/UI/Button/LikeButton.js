import React from "react";

import axios from "axios";

import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";

import Toast from "../Toast/Toast";

import classes from './LikeButton.css';


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
            console.log(res);
            // toast.success("Nice choice!", {
            //     position: "bottom-center",
            //     autoClose: 5000,
            //     hideProgressBar: true,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "dark",
            //     transition: Slide
            // });
            // <Toast type='success' message='song added successfully' />
            const message = <span><b>{track.title}</b> song is added to your liked music.</span>;
            // toast.success(message);
            Toast('success', message);
        })
        .catch(err => {
            console.log(err.response.data);
            // toast.error(err.response.data.message);
            // <Toast type='error' message={err.response.data.message} />
            Toast('error', err.response.data.message);
        });

    };


    return (
        <div onClick={() => onTrackLike(track)} className='like-btn'>
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