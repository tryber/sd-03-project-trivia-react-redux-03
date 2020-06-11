import React from 'react';
import Header from '../components/header';
import Question from '../components/question';
import { triviaAPI } from '../services/api';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
      questions: [{}],
    };
  }

  componentDidMount() {
    this.setState({questions: triviaAPI});
    triviaAPI().then(questions => this.setState({questions: questions}));
  }

  render() {
    const { currentQuestion } = this.state;
    return (
      <div>
        <Header />
        {this.state.questions.length ?
        <Question question={this.state.questions[currentQuestion]} /> :
        <p>Carregando perguntas...</p>}
      </div>
    );
  }
}


export default Game;
