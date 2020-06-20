import React from 'react';
import { Link } from 'react-router-dom';

const RankingBtn = () => (
  <Link to="/ranking">
    <button type="button" data-testid="btn-ranking">
      VER RANKING
    </button>
  </Link>
);

export default RankingBtn;
