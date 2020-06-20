import React from 'react';
import Header from '../components/Header';
import FeedBackMsg from '../components/FeedBackMsg';
import Results from '../components/Results';
import PlayAgainBtn from '../components/PlayAgainBtn';
import RankingBtn from '../components/RankingBtn';

function Feedback() {
  return (
    <div>
      <h1>Feedback</h1>
      <Header />
      <FeedBackMsg />
      <Results />
      <RankingBtn />
      <PlayAgainBtn />
    </div>
  );
}

export default Feedback;
