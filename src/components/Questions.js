import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scoreReducer, disabledReducer } from '../actions';
import { triviaAPI } from '../services/api';
import Loading from './Loading';
import Feedback from '../pages/Feedback';
import '../App.css';

function arrayRandom(array, maxRandom) {
  let max = maxRandom;
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
      isLoading: true,
      questions: [],
      arrayAnswers: [],
      remainingTime: 30,
      buttonDisabled: false,
      styleCorrectAnswer: {},
      styleIncorrectAnswer: {},
    };
  }

  componentDidMount() {
    let arrayAnswers = [];
    let arrayItem = [];
    triviaAPI().then((questions) => {
      questions.forEach((item) => {
        arrayItem = [item.correct_answer, ...item.incorrect_answers];
        arrayAnswers = [...arrayAnswers, arrayRandom(arrayItem, arrayItem.length)];
      });
      this.setState({
        isLoading: false,
        questions,
        arrayAnswers,
      });
    });
  }

  onClickNext() {
    const { currentQuestion } = this.state;
    const { disabled } = this.props;
    this.setState({
      currentQuestion: currentQuestion + 1,
      buttonDisabled: false,
      styleCorrectAnswer: {},
      styleIncorrectAnswer: {},
      remainingTime: 30,
    });
    disabled(false);
  }

  selectCorrectAnswer(level) {
    this.setState({
      styleCorrectAnswer: { border: '3px solid rgb(6, 240, 15)' },
      styleIncorrectAnswer: { border: '3px solid rgb(255, 0, 0)' },
      remainingTime: 0,
    });
    const { remainingTime } = this.state;
    const { addScore } = this.props;
    alert('Certa a resposta');
    this.setState({ buttonDisabled: true });
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
      remainingTime: 0,
    });
    alert('Que pena... você errou!');
  }

  buttonCorrect(answer, diffLevel) {
    const { styleCorrectAnswer } = this.state;
    const { disabledTruFalse } = this.props;
    return (
      <button
        key={answer}
        data-testid="correct-answer"
        onClick={() => this.selectCorrectAnswer(diffLevel)}
        style={styleCorrectAnswer}
        disabled={disabledTruFalse}
      >{answer}
      </button>
    );
  }

  buttonIncorrect(answer, index) {
    const { styleIncorrectAnswer, buttonDisabled } = this.state;
    const { disabledTruFalse } = this.props;
    return (
      <button
        key={answer}
        data-testid={`wrong-answer-${index}`}
        onClick={() => this.selectWrongAnswer()}
        style={styleIncorrectAnswer}
        disabled={disabledTruFalse}
      >{answer}
      </button>
    );
  }

  booleanButtons(diffLevel, correctAnswer, incorrectAnswers) {
    const { styleCorrectAnswer, styleIncorrectAnswer, buttonDisabled } = this.state;
    const { disabledTruFalse } = this.props;
    return (
      <ul>
        <button
          onClick={() => this.selectCorrectAnswer(diffLevel)}
          style={styleCorrectAnswer}
          data-testid="correct-answer"
          disabled={disabledTruFalse}
        >
          {correctAnswer}
        </button>
        <button
          onClick={() => this.selectWrongAnswer()}
          style={styleIncorrectAnswer}
          data-testid="wrong-answer-0"
          disabled={disabledTruFalse}
        >
          {incorrectAnswers}
        </button>
      </ul>
    );
  }

  generateOptions(type, correctAnswer, incorrectAnswers, diffLevel) {
    const { arrayAnswers, currentQuestion } = this.state;
    if (type === 'multiple') {
      return (
        arrayAnswers[currentQuestion].map((answer, index) => {
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

  time() {
    const { remainingTime } = this.state;
    const { disabled } = this.props;
    if (remainingTime > 0) {
      setTimeout(() => {
        this.setState({ remainingTime: remainingTime - 1 });
      }, 1000);
    }
    if (remainingTime === 0) {
      disabled(true)
    }
    return (
      <p>Tempo restante: {remainingTime}</p>
    );
  }

  render() {
    const { currentQuestion, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    } else if (currentQuestion === 5) {
      return (<div>{<Feedback />}</div>);
    } return (
      <div>
        {this.displayQuestion()}
        {this.time()}
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

const mapDispatchToProps = (dispatch) => ({
  addScore: (event) => dispatch(scoreReducer(event)),
  disabled: (value) => dispatch(disabledReducer(value)),
});

const mapStateToProps = (state) => ({
  disabledTruFalse: state.disbledReducer.disabled,
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
