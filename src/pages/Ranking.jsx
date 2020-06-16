import React from 'react';
import { Link } from 'react-router-dom';

function dataRanking() {
  const data = JSON.parse(localStorage.getItem('ranking'));
  data.sort((a, b) => (a.score - b.score));
  return (
    <div>
      {data.map((item, index) => <div key={item.name}>
        <img src={item.picture} />
        <h4 data-testid={`player-name-${index}`}>Nome: {item.name}</h4>
        <p data-testid={`player-score-${index}`}>Pontuação: {item.score}</p>
      </div>)}
    </div>
  );
}

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <h1>Ranking</h1>
        <Link to="/" data-testid="btn-go-home">Início</Link>
        {dataRanking()}
      </div>
    );
  }
}

export default Ranking;
