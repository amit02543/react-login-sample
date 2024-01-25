import React, { useState } from "react";

import Track from "../Search/Track";
import MusicAction from "../UI/Button/MusicAction";
import Card from "../UI/Card/Card";

import classes from "./Home.module.css";


const Home = ({ data }) => {

    const username = localStorage.getItem('user');

    const [userCollections, setUserCollections] = useState(data.collections);


    const tracks = data.tracks.map((track) => { 
        return <div key={track.id} className={classes["track-wrapper"]}>
            <Track 
                track={track} 
                collections={userCollections} 
            />
            { username &&                    
                <MusicAction 
                    type='song'
                    data={track} 
                    collections={userCollections}
                />
            }
        </div>
    });

    

    return (
        <Card className={classes.home}>
            {tracks}
        </Card>
    );
};

export default Home;
