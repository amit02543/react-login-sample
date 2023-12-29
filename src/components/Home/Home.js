import React from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = (props) => {

  const user = localStorage.getItem('user');

  return (
    <Card className={classes.home}>
      <h1>Welcome{user && ` back ${user}`}!</h1>
    </Card>
  );
};

export default Home;
