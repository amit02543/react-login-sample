import React from 'react';

import Card from '../UI/Card/Card';
import Track from '../Search/Track';

import classes from './Home.module.css';

const Home = ({ data }) => {

  const user = localStorage.getItem('user');
  console.log('Home random music: ', data);

  const tracks = data.map(track => <Track track={track} /> );

  return (
    <Card className={classes.home}>
      {/* <h1>Welcome{user && ` back ${user}`}!</h1> */}
      <div>{tracks}</div>
    </Card>
  );
};

export default Home;
