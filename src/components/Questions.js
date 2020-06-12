import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scoreReducer } from '../actions';
import { triviaAPI } from '../services/api';
import Loading from './Loading';
import Feedback from '../pages/Feedback';
import '../App.css';

function arrayRandom(array) {
  let max = 4;
  let indexRandom = Math.floor(Math.random() * max);
  const arrayLength = array.length;
  let newArray = [];
  for (let i = 0; i < arrayLength; i += 1) {
    newArray = [...newArray, array[indexRandom]];
    array.splice(indexRandom, 1);
    max -= 1;
    indexRandom = Math.floor(Math.random() * max);
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
      styleCorrectAnswer: {},
      styleIncorrectAnswer: {},
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

  onClickNext() {
    const { currentQuestion } = this.state;
    this.setState({
      currentQuestion: currentQuestion + 1,
      finishedQuestion: false,
      styleCorrectAnswer: {},
      styleIncorrectAnswer: {},
    });
  }

  selectCorrectAnswer(level) {
    this.setState({
      styleCorrectAnswer: { border: '3px solid rgb(6, 240, 15)' },
      styleIncorrectAnswer: { border: '3px solid rgb(255, 0, 0)' },
    });
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

  selectWrongAnswer() {
    this.setState({
      styleCorrectAnswer: { border: '3px solid rgb(6, 240, 15)' },
      styleIncorrectAnswer: { border: '3px solid rgb(255, 0, 0)' },
    });
    alert('Que pena... você errou!');
    this.setState({ finishedQuestion: true });
  }

  buttonCorrect(answer, diffLevel) {
    const { styleCorrectAnswer } = this.state;
    return (
      <button
        key={answer}
        data-testid="correct-answer"
        onClick={() => this.selectCorrectAnswer(diffLevel)}
        style={styleCorrectAnswer}
      >{answer}
      </button>
    );
  }

  buttonIncorrect(answer, index) {
    const { styleIncorrectAnswer } = this.state;
    return (
      <button
        key={answer}
        data-testid={`wrong-answer-${index}`}
        onClick={() => this.selectWrongAnswer()}
        style={styleIncorrectAnswer}
      >{answer}
      </button>
    );
  }

  booleanButtons(diffLevel, correctAnswer, incorrectAnswers) {
    const { styleCorrectAnswer, styleIncorrectAnswer } = this.state;
    return (
      <ul>
        <button
          onClick={() => this.selectCorrectAnswer(diffLevel)}
          style={styleCorrectAnswer}
          data-testid="correct-answer"
        >
          {correctAnswer}
        </button>
        <button
          onClick={() => this.selectWrongAnswer()}
          style={styleIncorrectAnswer}
          data-testid="wrong-answer-0"
        >
          {incorrectAnswers}
        </button>
      </ul>
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
    } return this.booleanButtons(diffLevel, correctAnswer, incorrectAnswers);
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

  decremenTime(time) {
    this.setState({ remainingTime: time - 1 });
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
          onClick={() => this.onClickNext()}
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
