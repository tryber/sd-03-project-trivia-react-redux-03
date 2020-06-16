import React from 'react';
import Header from '../components/Header';
import FeedBackMsg from '../components/FeedBackMsg';
import Results from '../components/Results';

function Feedback() {
  return (
    <div>
      <h1>Feedback</h1>
      <Header />
      <FeedBackMsg />
      <Results />
    </div>
  );
}

export default Feedback;
