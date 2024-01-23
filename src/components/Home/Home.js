import React, { useEffect, useState } from "react";
// import { Slide, toast } from 'react-toastify';
import axios from "axios";

import Card from "../UI/Card/Card";
import Track from "../Search/Track";

import classes from "./Home.module.css";
import MusicAction from "../UI/Button/MusicAction";
import LikeButton from "../UI/Button/LikeButton";
import AddCollection from "../UI/Button/AddCollection";

// import 'react-toastify/dist/ReactToastify.css';
import Toast from "../UI/Toast/Toast";

const Home = ({ data }) => {

    const username = localStorage.getItem('user');

    const [isDisabled, setIsDisabled] = useState(true);
    const [selectedCollection, setSelectedCollection] = useState("");
    const [userCollections, setUserCollections] = useState(data.collections);


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


    // const onAddCollectionClickHandler = event => {
    //     // event.preventDefault();
    //     console.log('Add collection: ', event.target)
    //     setIsDisabled(false);
    // };


    const collectionChangeHandler = async event => {
        setSelectedCollection(event.target.value);
        // console.log(track);

        // const headers = { 
        //     'Content-Type': 'application/json'
        // };


        // const requestBody = {
        //     username: username,
        //     name: event.target.value,
        //     type: 'song', 
        //     spotifyId: track.id,
        //     title: track.title,
        //     artists: track.artists,
        //     album: track.album,
        //     duration: track.duration,
        //     popularity: track.popularity,
        //     imageUrl: track.imageUrl,
        //     releaseDate: track.releaseDate,
        //     totalTracks: 0
        // };

        
        // await axios.post(
        //     `http://localhost:8080/collections`, 
        //     JSON.stringify(requestBody),
        //     { headers }
        // )
        // .then(res => {
        //     console.log(res);
        // })
        // .catch(err => {
        //     console.log(err.response.data);
        // });

        setIsDisabled(true);
    };


    const tracks = data.tracks.map((track) => { 
        return <div key={track.id} className={classes["track-wrapper"]}>
            <Track track={track} collections={userCollections} />
            {/* <div className={classes.action}>
                <LikeButton onClick={() => onTrackLike(track)} />
                <AddCollection track={track} />
            </div> */}
            <MusicAction 
                data={track} 
                // onLike={() => onTrackLike(track)} 
                // isDisabled={isDisabled}
                // onAddCollection={onAddCollectionClickHandler}
                collections={userCollections}
                // onCollectionChange={collectionChangeHandler}
            />
        </div>
    });

    

    return (
        <Card className={classes.home}>
            {tracks}
        </Card>
    );
};

export default Home;
