import React from 'react';

import Card from '../UI/Card/Card';
import Track from '../Search/Track';

import classes from './Home.module.css';

const Home = ({ data }) => {

  const tracks = data.map(track => <Track track={track} key={track.id} /> );

  return (
    <Card className={classes.home}>
      <div>{tracks}</div>
    </Card>
  );
};

export default Home;
