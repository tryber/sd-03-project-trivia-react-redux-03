import React from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';

class Feedback extends React.Component {
  constructor(props) {
    this.state = { 
        player: {
          name: '',
          assertions: '',
          score: '',
          gravatarEmail: '',
        }
    };
  }
  componentDidMount() {
    this.setState({ player: localStorage.getItem('state') })
  }
  
  feedackMessage(assertions) {
    switch (assertions) {
      case (assertions < 3):
        return(<h1>Podia ser melhor...</h1>);
      case (assertions >= 3):
        return(<h1>Mandou bem!</h1>);
      default:
        break;
    }
  }

  render() {
    const { assertions, score } = this.state.player;
    return (
      <div>
        {<Header />}
        <div data-testid="feedback-text">{this.feedackMessage(assertions)}</div>
        <div data-testid="feedback-total-question">Você acertou {assertions} questões!</div>
        <div data-testid="feedback-total-score">Um total de {score} pontos.</div>
        <Link to="/ranking">
          <button data-testid="btn-ranking">Ver Ranking</button>
        </Link>
        <Link to="/">
          <button data-testid="btn-play-again">Jogar Novamente</button>
        </Link>
      </div>
    )
  }
}

export default Feedback;
