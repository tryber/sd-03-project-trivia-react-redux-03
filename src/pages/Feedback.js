import React from 'react';
import { Link } from 'react-router-dom';
// import Header from '../components/Header';

const feedackMessage = (assertions) => {
  switch (assertions) {
    case (assertions < 3):
      return (<h1>Podia ser melhor...</h1>);
    case (assertions >= 3):
      return (<h1>Mandou bem!</h1>);
    default:
      return '';
  }
};

class Feedback extends React.Component {
  render() {
    const { assertions, score } = JSON.parse(localStorage.getItem('player'));

    return (
      <div>
        <div data-testid="feedback-text">{feedackMessage(assertions)}</div>
        <div data-testid="feedback-total-question">Você acertou {assertions} questões!</div>
        <div data-testid="feedback-total-score">Um total de {score} pontos.</div>
        <Link to="/ranking">
          <button data-testid="btn-ranking">Ver Ranking</button>
        </Link>
        <Link to="/">
          <button data-testid="btn-play-again">Jogar Novamente</button>
        </Link>
      </div>
    );
  }
}

export default Feedback;