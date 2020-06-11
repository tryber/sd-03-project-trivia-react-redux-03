import React from 'react';
/* import { connect } from 'react-redux';
import PropTypes from 'prop-types'; */
import { triviaAPI } from '../services/api';
import Loading from './Loading';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      questions: [],
    };
  }

  componentDidMount() {
    triviaAPI().then((questions) => {
      console.log(questions);
      this.setState({
        isLoading: false,
        questions,
      });
    });
  }

  questionsContent() {
    const { questions } = this.state;
    const answer = questions[0];
    return (
      <div>
        <h3 data-testid="question-category">Categoria: {answer.category}</h3>
        <h3 data-testid="question-text">Questão: {answer.question}</h3>
        <button data-testid="correct-answer">{answer.correct_answer}</button>
        {answer.incorrect_answers.map((alternative, index) =>
          <button data-testid={`wrong-answer-${index}`} key={alternative}>{alternative}</button>)}
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div>
        {this.questionsContent()}
      </div>
    );
  }
}


export default Questions;
