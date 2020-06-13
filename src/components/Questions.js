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
      questions: [],
      isLoading: true,
      arrayAnswers: [],
      enableTimer: true,
      remainingTime: 30,
      currentQuestion: 0,
      disableButtons: false,
      styleCorrectAnswer: {},
      styleIncorrectAnswer: {},
      goToNextBtnClass: 'hideButton',
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
    // const { disabled } = this.props;
    this.setState({
      currentQuestion: currentQuestion + 1,
      disableButtons: false,
      styleCorrectAnswer: {},
      styleIncorrectAnswer: {},
      remainingTime: 10,
      goToNextBtnClass: 'hideButton',
      enableTimer: true,
    });
    // disabled(false);
  }

  selectCorrectAnswer(level) {
    this.setState({
      styleCorrectAnswer: { border: '3px solid rgb(6, 240, 15)' },
      styleIncorrectAnswer: { border: '3px solid rgb(255, 0, 0)' },
    });
    const { remainingTime } = this.state;
    const { addScore } = this.props;
    alert('Certa a resposta');
    this.setState({ goToNextBtnClass: 'displayButton' });
    this.setState({
      disableButtons: true,
      goToNextBtnClass: 'displayButton',
      enableTimer: false,
    });
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
    this.setState({
      styleCorrectAnswer: { border: '3px solid rgb(6, 240, 15)' },
      styleIncorrectAnswer: { border: '3px solid rgb(255, 0, 0)' },
    });
    if (timedOut) {
      alert('O seu tempo acabou!');
    } else {
      alert('Que pena... você errou!');
    }
    this.setState({
      goToNextBtnClass: 'displayButton',
      disableButtons: true,
      enableTimer: false,
    });
  }

  buttonCorrect(answer, diffLevel) {
    const { styleCorrectAnswer, disableButtons } = this.state;
    // const { disabledTruFalse } = this.props;
    return (
      <button
        key={answer}
        data-testid="correct-answer"
        onClick={() => this.selectCorrectAnswer(diffLevel)}
        style={styleCorrectAnswer}
        // disabled={disabledTruFalse}
        disabled={disableButtons}
      >{answer}
      </button>
    );
  }

  buttonIncorrect(answer, index) {
    const { styleIncorrectAnswer, disableButtons } = this.state;
    // const { disabledTruFalse } = this.props;
    return (
      <button
        key={answer}
        data-testid={`wrong-answer-${index}`}
        onClick={() => this.selectWrongAnswer(false)}
        style={styleIncorrectAnswer}
        // disabled={disabledTruFalse}
        disabled={disableButtons}
      >{answer}
      </button>
    );
  }

  booleanButtons(diffLevel, correctAnswer, incorrectAnswers) {
    const { styleCorrectAnswer, styleIncorrectAnswer, disableButtons } = this.state;
    // const { disabledTruFalse } = this.props;
    return (
      <ul>
        <button
          onClick={() => this.selectCorrectAnswer(diffLevel)}
          style={styleCorrectAnswer}
          data-testid="correct-answer"
          // disabled={disabledTruFalse}
          disabled={disableButtons}
        >
          {correctAnswer}
        </button>
        <button
          onClick={() => this.selectWrongAnswer()}
          style={styleIncorrectAnswer}
          data-testid="wrong-answer-0"
          // disabled={disabledTruFalse}
          disabled={disableButtons}
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

  elapseTime() {
    const { remainingTime, enableTimer } = this.state;
    const { disableButtons } = this.props;
    if (remainingTime > 0 && enableTimer) {
      setTimeout(() => {
        this.setState({ remainingTime: this.state.remainingTime - 1 });
      }, 1000);
    }
    if (remainingTime === 0 && enableTimer) {
      disableButtons(true);
      this.selectWrongAnswer(true);
    }
    return (
      <p>Tempo restante: {remainingTime}</p>
    );
  }

  render() {
    const { currentQuestion, isLoading, goToNextBtnClass } = this.state;
    if (isLoading) {
      return <Loading />;
    } else if (currentQuestion === 5) {
      return (<div>{<Feedback />}</div>);
    } return (
      <div>
        {this.displayQuestion()}
        {this.elapseTime()}
        <button
          className={goToNextBtnClass}
          data-testid="btn-next"
          onClick={() => this.onClickNext()}
        >Próxima</button>
      </div>
    );
  }
}

Questions.propTypes = {
  addScore: PropTypes.func.isRequired,
  disableButtons: PropTypes.func.isRequired,
  // disabledTruFalse: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addScore: (event) => dispatch(scoreReducer(event)),
  disableButtons: (value) => dispatch(disabledReducer(value)),
});

const mapStateToProps = (state) => ({
  disabledTruFalse: state.disbledReducer.disabled,
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
