import React from 'react';
import { connect } from 'react-redux';

class Rank extends React.Component {
  render() {
    const sortedRank = [...JSON.parse(localStorage.getItem('ranking'))]
      .sort((a, b) => (a.score - b.score) * -1);

    return (
      <div>
        <h2
          data-testid="ranking-title"
        >
          Ranking
        </h2>
        <ol>
          {sortedRank.map((player, index) => (
            <li key={`${player.name}_${player.score}`}>
              <img src={player.picture} alt="player pic" />
              <h3 data-testid={`player-name-${index}`}>{player.name}</h3>
              <h4 data-testid={`player-score-${index}`}>{player.score}</h4>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  islogged: state,
});

export default connect(mapStateToProps)(Rank);
