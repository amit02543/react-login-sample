import React from 'react';

import Card from '../UI/Card/Card';
import Track from '../Search/Track';

import './Likes.css';

const Likes = ({ data }) => {

  const tracks = data
                    .sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
                    .map(track => <Track track={track} key={track.id} /> );

  return (
    <Card className='likes'>
      <div>{tracks}</div>
    </Card>
  );
};

export default Likes;
