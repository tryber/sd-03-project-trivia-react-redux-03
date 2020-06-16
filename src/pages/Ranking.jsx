import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {

  dataRanking() {
    const data = JSON.parse(localStorage.getItem('ranking'));
    data.sort((a, b) => (a.score - b.score));
    return (
      <div>
        {data.map((item, index) => <div key={index}>
          <h4 data-testid={`player-name-${index}`}>Nome: {item.name}</h4>
          <p data-testid={`player-score-${index}`}>Pontuação: {item.score}</p>
        </div>)}
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Ranking</h1>
        <Link to="/" data-testid="btn-go-home">Início</Link>
        {this.dataRanking()}
      </div>
    );
  }
}

export default Ranking;