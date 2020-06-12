import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scoreReducer } from '../actions';
import { triviaAPI } from '../services/api';
import Loading from './Loading';
import Feedback from '../pages/Feedback';

function arrayRandom(array) {
  const min = 0;
  let max = 4;
  let indexRandom = Math.floor(Math.random() * (max - min) + min);
  const arrayLength = array.length;
  let newArray = [];
  for (let i = 0; i < arrayLength; i += 1) {
    newArray = [...newArray, array[indexRandom]];
    array.splice(indexRandom, 1);
    max -= 1;
    indexRandom = Math.floor(Math.random() * (max - min) + min);
  }
  return newArray;
}

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      score: 0,
      isLoading: true,
      questions: [],
      remainingTime: 30,
      finishedQuestion: false,
    };
  }

  componentDidMount() {
    triviaAPI().then((questions) => {
      this.setState({
        isLoading: false,
        questions,
      });
    });
  }

  decremenTime(time) {
    this.setState({ remainingTime: time - 1 });
  }

  selectCorrectAnswer(level) {
    const { remainingTime } = this.state;
    const { addScore } = this.props;
    alert('Certa a resposta');
    this.setState({ finishedQuestion: true });
    switch (level) {
      case 'easy':
        addScore(1 * remainingTime);
        break;
      case 'medium':
        addScore(2 * remainingTime);
        break;
      case 'hard':
        addScore(3 * remainingTime);
        break;
      default:
        break;
    }
  }

  selectWrongAnswer(timedOut) {
    timedOut ? alert('Aaaaaaaahhhh não dá mais não, o seu tempo acabou') :
      alert('Que pena... você errou!');
    this.setState({ finishedQuestion: true });
  }

  buttonCorrect(answer, diffLevel) {
    return (
      <button
        key={answer}
        data-testid="correct-answer"
        disabled={this.state.finishedQuestion}
        onClick={() => this.selectCorrectAnswer(diffLevel)}
      >{answer}
      </button>
    );
  }

  buttonIncorrect(answer, index) {
    return (
      <button
        key={answer}
        data-testid={`wrong-answer-${index}`}
        disabled={this.state.finishedQuestion}
        onClick={() => this.selectWrongAnswer(false)}
      >{answer}
      </button>
    );
  }

  generateOptions(type, correctAnswer, incorrectAnswers, diffLevel) {
    const arrayAnswers = [...incorrectAnswers, correctAnswer];
    const randomAnswers = arrayRandom(arrayAnswers);
    if (type === 'multiple') {
      return (
        randomAnswers.map((answer, index) => {
          if (answer === correctAnswer) {
            return this.buttonCorrect(answer, diffLevel);
          }
          return this.buttonIncorrect(answer, index);
        }));
    } return (
      <ul>
        <button onClick={() => this.selectCorrectAnswer()}>{correctAnswer}</button>
        <button onClick={() => this.selectWrongAnswer(false)}>{incorrectAnswers}</button>
      </ul>
    );
  }

  displayQuestion() {
    const { currentQuestion, questions } = this.state;
    const {
      type,
      category,
      difficulty,
      correct_answer,
      incorrect_answers,
      question } = questions[currentQuestion];
    return (
      <div>
        <h3 data-testid="question-category">Categoria: {category}</h3>
        <h3 data-testid="question-text">
          Questão {currentQuestion + 1}: {question}
        </h3>
        {this.generateOptions(type, correct_answer, incorrect_answers, difficulty)}
      </div>
    );
  }

  render() {
    const { currentQuestion, remainingTime, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    } else if (currentQuestion === 5) {
      return (<div>{<Feedback />}</div>);
    } return (
      <div>
        {this.displayQuestion()}
        <p>Tempo restante: {remainingTime}</p>
        <button
          className="btn-next"
          data-testid="btn-next"
          onClick={() => this.setState({
            currentQuestion: currentQuestion + 1,
            finishedQuestion: false,
          })}
        >Próxima</button>
      </div>
    );
  }
}

Questions.propTypes = {
  addScore: PropTypes.func.isRequired,
};

// setTimeout(() => {
//   this.decremenTime(remainingTime);
// }, 1000);

const mapDispatchToProps = (dispatch) => ({
  addScore: (event) => dispatch(scoreReducer(event)),
});

export default connect(null, mapDispatchToProps)(Questions);
