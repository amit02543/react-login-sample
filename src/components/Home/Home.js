import React, { useEffect, useState } from "react";

import axios from "axios";

import Card from "../UI/Card/Card";
import Track from "../Search/Track";

import classes from "./Home.module.css";

const Home = ({ data }) => {

    const [userCollections, setUserCollections] = useState(data.collections);

    const tracks = data.tracks.map((track) => <Track track={track} key={track.id} collections={userCollections} />);

    

    return (
        <Card className={classes.home}>
            <div>{tracks}</div>
        </Card>
    );
};

export default Home;
